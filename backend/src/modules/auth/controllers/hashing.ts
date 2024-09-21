import bcrypt from 'bcrypt';
import { StatusError } from '../../../inits/answers/errorStatus';

const SALT_ROUNDS = 10;

async function hashPassword(password: string): Promise<string> {
    try {
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const hashedPassword = await bcrypt.hash(password, salt);
        if (!hashedPassword) { throw new StatusError('Error hashing password', 500); }
        return hashedPassword;
    } catch (error) {
        throw new StatusError('Error hashing password', 500);
    }
}

async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    try {
        const match = await bcrypt.compare(password, hashedPassword);
        if (!match) { throw new StatusError('Email or password is incorrect', 401); }
        return match;
    } catch (error) {
        throw new StatusError('Email or password is incorrect', 401);
    }
}

export { hashPassword, comparePassword };