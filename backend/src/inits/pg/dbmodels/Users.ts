import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { StatusError } from '../../answers/errorStatus';
import { isSqlInjection, isScriptInjection } from '../dbRequests/helpers/validations';

@Entity({ name: 'users' })
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false, default: 'client' })
  role: string;

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  lastLogin: Date;

  constructor(name: string, email: string, password: string, role: string) {
    this.id = 0;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.createdAt = new Date();
    this.lastLogin = new Date();
  }

  @BeforeInsert()
  @BeforeUpdate()
  validate() {
    if (!this.name || !this.email || !this.password || !this.role) {
      throw new StatusError('Invalid user data', 400);
    }

    isSqlInjection(this.name); 
    isSqlInjection(this.email); 
    isScriptInjection(this.name);
    isScriptInjection(this.email);
  }
}