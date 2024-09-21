import { StatusError } from "../../../inits/answers/errorStatus";
import { jwts } from "../controllers/jwt";
import { JwtTokenPayload } from "../@types/payload.types";
import BooksService, { Book } from "../../../inits/pg/dbRequests/BooksService";
import PagesAuthorService, { Page as AuthorPage } from "../../../inits/pg/dbRequests/PagesAuthorService";
import PagesReaderService, { Page as ReaderPage } from "../../../inits/pg/dbRequests/PagesReaderService";

interface UnauthorizedPayload {
    id: null;
    name: null;
    email: null;
    role: 'unauthorized';
}

type UserPayload = JwtTokenPayload | UnauthorizedPayload;

abstract class User {
    id: number | null;
    name: string | null;
    email: string | null;
    role: string | null;

    constructor(data: UserPayload) {
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
        this.role = data.role;
    }

    validate(): void {
        if (!this.id || !this.name || !this.email || !this.role) {
            throw new StatusError('Invalid user data', 400);
        }
    }

    abstract getClass(): string;

    // Methods for handling books
    async getBooks(bookId: number): Promise<any> {
        throw new StatusError('Method not implemented', 400);
    }

    async getBook(bookId: number): Promise<any> {
        throw new StatusError('Method not implemented', 400);
    }

    async createBook(data: Book): Promise<any> {
        throw new StatusError('Method not implemented', 400);
    }

    async deleteBook(bookId: number): Promise<any> {
        throw new StatusError('Method not implemented', 400);
    }

    async updateBook(bookId: number, data: Book): Promise<any> {
        throw new StatusError('Method not implemented', 400);
    }

    // Methods for handling pages
    async getPages(bookId: number): Promise<any> {
        throw new StatusError('Method not implemented', 400);
    }

    async getPage(pageId: number, bookId: number): Promise<any> {
        throw new StatusError('Method not implemented', 400);
    }

    async createPage(data: any): Promise<any> {
        throw new StatusError('Method not implemented', 400);
    }

    async updatePage(pageId: number, data: any): Promise<any> {
        throw new StatusError('Method not implemented', 400);
    }

    async deletePage(pageId: number): Promise<any> {
        throw new StatusError('Method not implemented', 400);
    }
}

class Author extends User {
    constructor(data: JwtTokenPayload) {
        super(data);
        this.validate();

        // console.log(data);
    }

    getClass() {
        return 'author';
    }

    // Override book methods for author
    async getBooks() {
        return await BooksService.getAllOwnedBooksByAuthorId(this.id as number);
    }

    async getBook(bookId: number) {
        return await BooksService.getBookByAuthorId(this.id as number, bookId);
    }

    async createBook(data: Book) {
        const new_data = { ...data, authorId: this.id as number, pagesCount: 0 };
        console.log(new_data);
        return await BooksService.createBook(new_data);
    }

    async deleteBook(bookId: number) {
        return await BooksService.deleteBookById(this.id as number, bookId);
    }

    async updateBook(bookId: number, data: Book) {
        return await BooksService.updateBookById(this.id as number, bookId, data);
    }

    // Override page methods for author
    async getPages(bookId: number) {
        return await PagesAuthorService.getAllOwnedPagesByBookId(this.id as number, bookId);
    }

    async getPage(pageNumber: number, bookId: number) {
        return await PagesAuthorService.getOwnedPageById(this.id as number, pageNumber, bookId);
    }

    
    async createPage(data: AuthorPage) {
        // data.authorId = this.id as number;
        const new_data = { ...data, authorId: this.id as number };
        console.log(new_data);
        return await PagesAuthorService.createPage(new_data);
    }

    async updatePage(pageId: number, data: AuthorPage) {
        return await PagesAuthorService.updatePageById(this.id as number, pageId, data);
    }

    async deletePage(pageId: number) {
        return await PagesAuthorService.deletePageById(this.id as number, pageId);
    }
}

class Reader extends User {
    constructor(data: JwtTokenPayload) {
        super(data);
        this.validate();
    }

    getClass() {
        return 'reader';
    }

    // Override page methods for reader
    async getPages(bookId: number) {
        throw new StatusError('Method not implemented for Reader', 400);
    }

    async getBook(bookId: number): Promise<any> {
        return await PagesReaderService.getBookPagesById(this.id as number, bookId, 'all');
    }

    async getPage(pageNumber: number, bookId: number) {
        return await PagesReaderService.getBookPagesById(this.id as number, bookId, pageNumber);
    }

    async createPage(data: ReaderPage) {
        throw new StatusError('Method not implemented for Reader', 400);
    }

    async updatePage(pageId: number, data: ReaderPage) {
        throw new StatusError('Method not implemented for Reader', 400);
    }

    async deletePage(pageId: number) {
        throw new StatusError('Method not implemented for Reader', 400);
    }
}

class Unauthorized extends User {
    constructor() {
        super({ id: null, name: null, email: null, role: 'unauthorized' });
    }

    getClass() {
        return 'unauthorized';
    }
}

abstract class Role {
    static async validateToken(token: string | null): Promise<JwtTokenPayload> {
        if (!token) { throw new StatusError('Invalid token', 401); }

        const decoded: JwtTokenPayload = await jwts.validateAccessToken(token);
        if (!decoded) { throw new StatusError('Invalid token', 401); }

        return decoded;
    }

    static async assignRole(decoded: JwtTokenPayload, access: string | null): Promise<User> {
        switch (decoded.role) {
            case 'client':
                if (access === 'reader') {
                    return new Reader(decoded);
                } else if (access === 'author') {
                    return new Author(decoded);
                } else {
                    throw new StatusError('Invalid access', 401);
                }
            default:
                return new Unauthorized();
        }
    }

    static async createRole(token: string | null, access: string | null): Promise<User> {
        const decoded = await this.validateToken(token);
        return this.assignRole(decoded, access);
    }
}

export { User, Role, Author, Reader, Unauthorized };