"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../dbmodels/User");
const errors_models_1 = require("../../modules/auth/models/errors.models");
const pg_connect_init_1 = require("../pg.connect.init");
const reqhelpers_1 = require("./helpers/reqhelpers");
class UserService {
    constructor() {
        this.userRepository = pg_connect_init_1.AppDataSource.getRepository(User_1.Users);
    }
    async createUser(name, email, password, role) {
        return (0, reqhelpers_1.reqBuilder)(async () => {
            const user = this.userRepository.create({ name, email, password, role });
            return await this.userRepository.save(user);
        }, 'User not created', 500);
    }
    async getUserById(id) {
        return (0, reqhelpers_1.reqBuilder)(async () => {
            return await this.userRepository.findOneBy({ id });
        }, 'User not found', 404);
    }
    async getUserByEmail(email) {
        return (0, reqhelpers_1.reqBuilder)(async () => {
            return await this.userRepository.findOneBy({ email });
        }, 'User not found', 404);
    }
    async getAllUsers() {
        return (0, reqhelpers_1.reqBuilder)(async () => {
            return await this.userRepository.find();
        }, 'Users not found', 500);
    }
    async updateUser(id, updateData) {
        return (0, reqhelpers_1.reqBuilder)(async () => {
            let user = await this.userRepository.findOneBy({ id });
            if (!user) {
                throw new errors_models_1.StatusError('User not found', 404);
            }
            this.userRepository.merge(user, updateData);
            return await this.userRepository.save(user);
        }, 'User not updated', 500);
    }
    async deleteUser(id) {
        return (0, reqhelpers_1.reqBuilder)(async () => {
            const user = await this.userRepository.findOneBy({ id });
            if (!user) {
                throw new errors_models_1.StatusError('User not found', 404);
            }
            await this.userRepository.remove(user);
        }, 'User not deleted', 500);
    }
}
exports.default = new UserService();
