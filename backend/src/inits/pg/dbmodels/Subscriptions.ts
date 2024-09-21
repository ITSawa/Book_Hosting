import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { StatusError } from '../../answers/errorStatus';
import { isSqlInjection, isScriptInjection } from '../dbRequests/helpers/validations';

@Entity({ name: 'subscriptions' })
export class Subscriptions {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    userId: number;

    @Column({ nullable: false })
    authorId: number;

    @Column({ type: 'timestamp', nullable: false })
    subscriptionDate: Date;

    @Column({ type: 'decimal', nullable: false })
    price: number;

    @Column({ type: 'boolean', nullable: false, default: true })
    isActive: boolean;

    @CreateDateColumn({ type: 'timestamp', nullable: false })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', nullable: false })
    updatedAt: Date;

    constructor(userId: number, authorId: number, price: number) {
        this.id = 0;
        this.userId = userId;
        this.authorId = authorId;
        this.price = price;
        this.subscriptionDate = new Date();
        this.isActive = true;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    @BeforeInsert()
    @BeforeUpdate()
    validate() {
        if (!this.userId || !this.authorId || !this.price) {
            throw new StatusError('Invalid subscription data', 400);
        }
    }
}