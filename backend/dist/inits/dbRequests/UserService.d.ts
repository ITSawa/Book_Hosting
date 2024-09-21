import { Users } from '../dbmodels/User';
declare class UserService {
    private userRepository;
    constructor();
    createUser(name: string, email: string, password: string, role: string): Promise<Users>;
    getUserById(id: number): Promise<Users>;
    getUserByEmail(email: string): Promise<Users>;
    getAllUsers(): Promise<Users[]>;
    updateUser(id: number, updateData: Partial<Users>): Promise<Users>;
    deleteUser(id: number): Promise<void>;
}
declare const _default: UserService;
export default _default;
//# sourceMappingURL=UserService.d.ts.map