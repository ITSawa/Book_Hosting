import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { StatusError } from '../../answers/errorStatus';
import { isSqlInjection, isScriptInjection, isNumber } from '../dbRequests/helpers/validations';
import { genUUIDUrlForBook } from '../dbRequests/helpers/generator';

@Entity({ name: 'books' })
export class Books {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, default: genUUIDUrlForBook() })
    url: string;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    description: string;

    @Column({ nullable: false })
    authorId: number;

    @Column({ nullable: false })
    authors: string;

    @Column()
    authorDescription: string;

    @Column()
    previewImgUrl: string;

    @Column({ nullable: false, default: 0 })
    bookPrice: number;

    @Column({ nullable: false, default: false })
    onlySubscribers: boolean;

    @Column({ nullable: false, default: 0 })
    pagesCount: number;

    @CreateDateColumn({ type: 'timestamp', nullable: false })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', nullable: false })
    updatedAt: Date;

    constructor(
        name: string,
        description: string,
        authorId: number,
        authors: string,
        authorDescription: string,
        previewImgUrl: string,
        bookPrice: number,
        onlySubscribers: boolean,
        pagesCount: number
    ) {
        this.id = 0;
        this.url = genUUIDUrlForBook();
        this.name = name;
        this.description = description;
        this.authorId = authorId;
        this.authors = authors;
        this.authorDescription = authorDescription;
        this.previewImgUrl = previewImgUrl;
        this.bookPrice = bookPrice;
        this.onlySubscribers = onlySubscribers;
        this.pagesCount = pagesCount;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    @BeforeInsert()
    validateUrl() {
        this.checkUrl();
    }

    @BeforeInsert()
    @BeforeUpdate()
    validate() {
        this.validateFields();
    }

    private checkUrl() {
        if (!this.url) {
            this.url = genUUIDUrlForBook();
        }
    }

    private validateFields() {
        console.log('Validating book:', {
            name: this.name,
            description: this.description,
            authorId: this.authorId,
            authors: this.authors,
            bookPrice: this.bookPrice,
            onlySubscribers: this.onlySubscribers,
            pagesCount: this.pagesCount
        });
    
        if (!this.name) {
            throw new StatusError('Name is required', 400);
        }
        if (!this.description) {
            throw new StatusError('Description is required', 400);
        }
        if (typeof this.authorId !== 'number' || this.authorId <= 0) {
            throw new StatusError('Author ID must be a positive number', 400);
        }
        if (!this.authors) {
            throw new StatusError('Authors is required', 400);
        }
        if (typeof this.bookPrice !== 'number' || this.bookPrice < 0) {
            throw new StatusError('Book price must be a non-negative number', 400);
        }
        if (typeof this.onlySubscribers !== 'boolean') {
            throw new StatusError('Only subscribers field must be a boolean', 400);
        }
        if (typeof this.pagesCount !== 'number' || this.pagesCount < 0) {
            throw new StatusError('Pages count must be a non-negative number', 400);
        }
        
        this.checkForInjections();
    }

    private checkForInjections() {
        isSqlInjection(this.name);
        isScriptInjection(this.name);

        isSqlInjection(this.description);
        isScriptInjection(this.description);

        isSqlInjection(this.authors);
        isScriptInjection(this.authors);

        isSqlInjection(this.authorDescription);
        isScriptInjection(this.authorDescription);

        isSqlInjection(this.previewImgUrl);
        isScriptInjection(this.previewImgUrl);
    }

    static validateOnUpload(data: any) {

        if (!data.name) {
            throw new StatusError('Name is required', 400);
        }
        if (!data.description) {
            throw new StatusError('Description is required', 400);
        }
        if (typeof data.authorId !== 'number' || data.authorId <= 0) {
            throw new StatusError('Author ID must be a positive number', 400);
        }
        if (!data.authors) {
            throw new StatusError('Authors is required', 400);
        }
        if (data.onlySubscribers === null || data.onlySubscribers === undefined) {
            throw new StatusError('Only subscribers field is required', 400);
        }
        if (typeof data.onlySubscribers !== 'boolean') {
            throw new StatusError('Only subscribers field must be a boolean', 400);
        }
        if (!data.pagesCount && data.pagesCount !== 0) {
            throw new StatusError('Pages count is required', 400);
        }
        if (typeof data.pagesCount !== 'number' || data.pagesCount < 0) {
            throw new StatusError('Pages count must be a non-negative number', 400);
        }
        if (typeof data.bookPrice !== 'number' || data.bookPrice < 0) {
            throw new StatusError('Book price must be a non-negative number', 400);
        }

        isSqlInjection(data.name);
        isScriptInjection(data.name);

        isSqlInjection(data.description);
        isScriptInjection(data.description);

        isSqlInjection(data.authors);
        isScriptInjection(data.authors);

        isSqlInjection(data.authorDescription);
        isScriptInjection(data.authorDescription);

        isSqlInjection(data.previewImgUrl);
        isScriptInjection(data.previewImgUrl);
    }
}