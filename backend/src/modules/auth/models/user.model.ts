import { StatusError } from '../../../inits/answers/errorStatus';
import { jwts } from '../controllers/jwt';
import { validation } from '../controllers/validation';
import UserService from '../../../inits/pg/dbRequests/UserService';
import { hashPassword, comparePassword } from '../controllers/hashing';
import type { jwtUserPayload, RefreshData, UserData } from '../@types/validation.types';
import { JwtPayload } from 'jsonwebtoken';

abstract class User {
    id: string | number | null;
    name: string | null;
    email: string | null;

    constructor(id: string | number | null = null, name: string | null = null, email: string | null = null) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    static async identifyRole(token: string | null, type = 'access_token'): Promise<Unauthorized | Client> {
        try {
            if (!token) {
                return new Unauthorized();
            } 

            let decoded;
            if (type === 'access_token') {
                decoded = await jwts.validateAccessToken(token);
            } else if (type === 'refresh_token') {
                decoded = await jwts.validateRefreshToken(token);
            } else {
                throw new StatusError('Invalid token', 401);
            }
            
            const { id, name, email, role } = decoded as jwtUserPayload;

            switch (role) {
                case 'client':
                    return new Client(id, name, email);
                case 'unauthorized':
                default:
                    return new Unauthorized(id, name, email);
            }
        } catch (error) {
            throw new StatusError('Invalid token', 401);
        }
    }

    abstract registration(...args: any[]): Promise<any>;
    abstract login(...args: any[]): Promise<any>;

    static className() {
        return 'user';
    }
}

async function createTokens(user: JwtPayload): Promise<UserData> {
    const accessToken: string = await jwts.createAccessToken({ id: user.id, name: user.name, email: user.email, role: user.role });
    const refreshToken: string = await jwts.createRefreshToken({ id: user.id, name: user.name, email: user.email, role: user.role });

    return { 'user': { 'name': user.name, 'email': user.email }, 'access_token': accessToken, 'refresh_token': refreshToken };
}

class Unauthorized extends User {
    constructor(id: string | number | null = null, name: string | null = null, email: string | null = null) {
        super(id, name, email);
    }

    async registration(name: string, email: string, password: string): Promise<UserData> {
        validation.validateRegistrationData({ name, email, password });
        const hashedPassword: string = await hashPassword(password);
        const user = await UserService.createUser(name, email, hashedPassword, 'client');
        return await createTokens({ id: user.id, name: user.name, email: user.email, role: user.role });
    }

    async login(email: string, password: string): Promise<UserData> {
        validation.validateLoginData({ email, password });
        const user = await UserService.getUserByEmail(email);
        await comparePassword(password, user.password);
        return await createTokens({ id: user.id, name: user.name, email: user.email, role: user.role });
    }

    async logout() {
        return new StatusError('No permission', 501);
    }

    async refreshAccess(token: any): Promise<RefreshData> {
        throw new StatusError('Token expired', 401);
    }

    static className() {
        return 'unauthorized';
    }
}

class Client extends User {
    role: string;

    constructor(id: string | number | null, name: string | null, email: string | null) {
        super(id, name, email);
        this.role = 'client';
    }

    async logout() {
        return true
    }

    async registration(name: string, email: string, password: string) {
        throw new StatusError('No permission', 501);
    }

    async login(email: string, password: string) {
        throw new StatusError('No permission', 501);
    }

    async refreshAccess(refreshToken: string): Promise<RefreshData> {
        const decoded: JwtPayload = await jwts.validateRefreshToken(refreshToken);
        if (decoded) {
            return { 'user': { 'name': decoded.name, 'email': decoded.email }, 'access_token': await jwts.createAccessToken({ id: decoded.id, name: decoded.name, email: decoded.email, role: decoded.role })}
        }
        throw new StatusError('Invalid refresh token', 401);
    }

    static className() {
        return 'client';
    }
}

class Subscriber extends Client {
    constructor(id: string | null, name: string | null, email: string | null) {
        super(id, name, email);
    }

    static className() {
        return 'subscriber';
    }
}

export { User, Unauthorized, Client };