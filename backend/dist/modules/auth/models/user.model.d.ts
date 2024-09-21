import { StatusError } from '../models/errors.models';
import type { UserData } from '../@types/validation.types';
declare abstract class User {
    id: string | number | null;
    name: string | null;
    email: string | null;
    constructor(id?: string | number | null, name?: string | null, email?: string | null);
    static identifyRole(token: string | null): Promise<Unauthorized | Client>;
    abstract registration(...args: any[]): Promise<any>;
    abstract login(...args: any[]): Promise<any>;
    static className(): string;
}
declare class Unauthorized extends User {
    constructor(id?: string | number | null, name?: string | null, email?: string | null);
    registration(name: string, email: string, password: string): Promise<UserData>;
    login(email: string, password: string): Promise<UserData>;
    logout(): Promise<StatusError>;
    static className(): string;
}
declare class Client extends User {
    role: string;
    constructor(id: string | number | null, name: string | null, email: string | null);
    logout(): Promise<boolean>;
    registration(name: string, email: string, password: string): Promise<void>;
    login(email: string, password: string): Promise<void>;
    static className(): string;
}
export { User, Unauthorized, Client };
//# sourceMappingURL=user.model.d.ts.map