"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = exports.Unauthorized = exports.User = void 0;
const errors_models_1 = require("../models/errors.models");
const jwt_1 = require("../controllers/jwt");
const validation_1 = require("../controllers/validation");
const UserService_1 = __importDefault(require("../../../inits/dbRequests/UserService"));
const hashing_1 = require("../controllers/hashing");
class User {
    constructor(id = null, name = null, email = null) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
    static async identifyRole(token) {
        try {
            if (!token) {
                return new Unauthorized();
            }
            const decoded = await jwt_1.jwts.validateAccessToken(token);
            const { id, name, email, role } = decoded;
            switch (role) {
                case 'client':
                    return new Client(id, name, email);
                case 'unauthorized':
                default:
                    return new Unauthorized(id, name, email);
            }
        }
        catch (error) {
            throw new errors_models_1.StatusError('Invalid token', 401);
        }
    }
    static className() {
        return 'user';
    }
}
exports.User = User;
async function createTokens(user) {
    const accessToken = await jwt_1.jwts.createAccessToken({ id: user.id, name: user.name, email: user.email, role: user.role });
    const refreshToken = await jwt_1.jwts.createRefreshToken({ id: user.id, name: user.name, email: user.email, role: user.role });
    return { 'user': { 'name': user.name, 'email': user.email }, 'access_token': accessToken, 'refresh_token': refreshToken };
}
class Unauthorized extends User {
    constructor(id = null, name = null, email = null) {
        super(id, name, email);
    }
    async registration(name, email, password) {
        validation_1.validation.validateRegistrationData({ name, email, password });
        const hashedPassword = await (0, hashing_1.hashPassword)(password);
        const user = await UserService_1.default.createUser(name, email, hashedPassword, 'unauthorized');
        return await createTokens({ id: user.id, name: user.name, email: user.email, role: user.role });
    }
    async login(email, password) {
        validation_1.validation.validateLoginData({ email, password });
        const user = await UserService_1.default.getUserByEmail(email);
        await (0, hashing_1.comparePassword)(password, user.password);
        return await createTokens({ id: user.id, name: user.name, email: user.email, role: user.role });
    }
    async logout() {
        return new errors_models_1.StatusError('No permission', 501);
    }
    static className() {
        return 'unauthorized';
    }
}
exports.Unauthorized = Unauthorized;
class Client extends User {
    constructor(id, name, email) {
        super(id, name, email);
        this.role = 'client';
    }
    async logout() {
        return true;
    }
    async registration(name, email, password) {
        throw new errors_models_1.StatusError('No permission', 501);
    }
    async login(email, password) {
        throw new errors_models_1.StatusError('No permission', 501);
    }
    static className() {
        return 'client';
    }
}
exports.Client = Client;
class Subscriber extends Client {
    constructor(id, name, email) {
        super(id, name, email);
    }
    static className() {
        return 'subscriber';
    }
}
