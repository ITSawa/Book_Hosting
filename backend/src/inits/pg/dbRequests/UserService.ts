import { Repository } from 'typeorm';
import { Users } from '../dbmodels/Users';
import { StatusError } from '../../answers/errorStatus';
import { AppDataSource } from '../pg.connect.init';
import { reqBuilder } from './helpers/reqhelpers';


class UserService {
  private userRepository: Repository<Users>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(Users);
  }

  async createUser(name: string, email: string, password: string, role: string): Promise<Users> {
    return reqBuilder(async () => {
      const user = this.userRepository.create({ name, email, password, role });
      return await this.userRepository.save(user);
    }, 'User not created', 500);
  }

  async getUserById(id: number): Promise<Users> {
    return reqBuilder(async () => {
      return await this.userRepository.findOneBy({ id });
    }, 'User not found', 404);
  }

  async getUserByEmail(email: string): Promise<Users> {
    return reqBuilder(async () => {
      return await this.userRepository.findOneBy({ email });
    }, 'User not found', 404);
  }

  async getAllUsers(): Promise<Users[]> {
    return reqBuilder(async () => {
      return await this.userRepository.find();
    }, 'Users not found', 500);
  }

  async updateUser(id: number, updateData: Partial<Users>): Promise<Users> {
    return reqBuilder(async () => {
      let user = await this.userRepository.findOneBy({ id });
      if (!user) {
        throw new StatusError('User not found', 404);
      }
      this.userRepository.merge(user, updateData);
      return await this.userRepository.save(user);
    }, 'User not updated', 500);
  }

  async deleteUser(id: number): Promise<void> {
    return reqBuilder(async () => {
      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        throw new StatusError('User not found', 404);
      }
      await this.userRepository.remove(user);
    }, 'User not deleted', 500);
  }

  async updateLastLogin(id: number): Promise<Users> {
    return reqBuilder(async () => {
      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        throw new StatusError('User not found', 404);
      }
      user.lastLogin = new Date();
      return await this.userRepository.save(user);
    }, 'User not updated', 500);
  }
}

export default new UserService();