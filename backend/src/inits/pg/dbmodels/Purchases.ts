import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { StatusError } from '../../answers/errorStatus';

@Entity({ name: 'purchases' })
export class Purchases {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    userId: number;

    @Column({ nullable: false })
    bookId: number;
    
    @Column({ type: 'timestamp', nullable: false })
    purchaseDate: Date;

    @Column({ type: 'decimal', nullable: false })
    price: number;

    @CreateDateColumn({ type: 'timestamp', nullable: false })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', nullable: false })
    updatedAt: Date;

    constructor(userId: number, bookId: number, price: number) {
        this.id = 0;
        this.userId = userId;
        this.bookId = bookId;
        this.price = price;
        this.purchaseDate = new Date();
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    @BeforeInsert()
    @BeforeUpdate()
    validate() {
        if (!this.userId || !this.bookId || !this.price) {
            throw new StatusError('Invalid purchase data', 400);
        }
    }
}