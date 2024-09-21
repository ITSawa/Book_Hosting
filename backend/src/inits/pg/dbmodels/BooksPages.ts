import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { StatusError } from '../../answers/errorStatus';
import { isSqlInjection, isScriptInjection } from '../dbRequests/helpers/validations';

@Entity({ name: 'pages' })
export class BooksPages {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ nullable: false })
    pageNumber: number;

    @Column({ nullable: false })
    bookId: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    authorId: number;

    @Column({ nullable: false })
    url: string;

    @Column({ nullable: false })
    title: string;

    @Column({ nullable: false })
    content: string;

    @Column({ nullable: false })
    matrix: string;

    @CreateDateColumn({ type: 'timestamp', nullable: false })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', nullable: false })
    lastLogin: Date;

    constructor(
        bookId: number,
        pageNumber: number,
        name: string,
        authorId: number,
        url: string,
        title: string,
        content: string,
        matrix: string
    ) {
        this.id = 0;
        this.pageNumber = pageNumber;
        this.url = url;
        this.bookId = bookId;
        this.name = name;
        this.authorId = authorId;
        this.title = title;
        this.content = content;
        this.matrix = matrix;
        this.createdAt = new Date();
        this.lastLogin = new Date();
    }

    @BeforeInsert()
    @BeforeUpdate()
    async validate() {
        console.log(this.pageNumber, this.bookId, this.name, this.authorId, this.title, this.content, this.matrix)

        if (!this.pageNumber || !this.bookId || !this.name || !this.authorId || !this.title || !this.content || !this.matrix) {
            throw new StatusError('Invalid book page data', 400);
        }

        isSqlInjection(this.name);
        isScriptInjection(this.name);
        isSqlInjection(this.title);
        isScriptInjection(this.title);
        isSqlInjection(this.content);
        isScriptInjection(this.content);
        isSqlInjection(this.matrix);
        isScriptInjection(this.matrix);
    }
}