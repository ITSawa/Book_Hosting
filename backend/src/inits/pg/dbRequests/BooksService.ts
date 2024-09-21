import { Repository, EntityManager } from 'typeorm';
import { Books } from '../dbmodels/Books';
import { BooksPages } from '../dbmodels/BooksPages';
import { StatusError } from '../../answers/errorStatus';
import { AppDataSource } from '../pg.connect.init';
import { reqBuilder } from './helpers/reqhelpers';
import { Like } from 'typeorm';
import { isNumber, isSqlInjection, isScriptInjection } from './helpers/validations';



export interface Book {
    name: string,
    description: string,
    authorId: number,
    authors: string,
    authorDescription: string,
    previewImgUrl: string,
    bookPrice: number,
    onlySubscribers: boolean,
    pagesCount: number
}

class BooksService {
    private bookRepository: Repository<Books>;

    constructor() {
        this.bookRepository = AppDataSource.getRepository(Books);
    }

    // Author-related methods
    async getBookByAuthorId(authorId: number, id: number): Promise<Books[]> {
        isNumber(authorId, 'authorId');
        isNumber(id, 'id');

        return reqBuilder(async () => {
            return await this.bookRepository.find({ where: { authorId, id } });
        }, 'Books not found', 404);
    }

    async getAllOwnedBooksByAuthorId(authorId: number): Promise<Books[]> {
        return reqBuilder(async () => {
            return await this.bookRepository.find({ where: { authorId } });
        }, 'Books not found', 404);
    }

    async getAllBooksByAuthorId(authorId: number): Promise<Books[]> {
        isNumber(authorId, 'authorId');

        return reqBuilder(async () => {
            return await this.bookRepository.find({ where: { authorId } });
        }, 'Books not found', 404);
    }

    async getAllBooksByAuthorName(name: string): Promise<Books[]> {
        isSqlInjection(name);
        isScriptInjection(name);

        return reqBuilder(async () => {
            return await this.bookRepository.find({ where: { authors: Like(`%${name}%`) } });
        }, 'Books not found', 404);
    }

    // async deleteBookById(authorId: number, id: number): Promise<void> {
    //     return reqBuilder(async () => {
    //         const book = await this.bookRepository.findOneBy({ id });
    //         if (!book) {
    //             throw new StatusError('Book not found', 404);
    //         }
    //         await this.bookRepository.remove(book);
    //     }, 'Book not deleted', 500);
    // }

    
    async deleteBookById(authorId: number, id: number): Promise<void> {
        isNumber(authorId, 'authorId');
        isNumber(id, 'id');

        return reqBuilder(async () => {
            return await AppDataSource.transaction(async (transactionalEntityManager: EntityManager) => {
                const book = await transactionalEntityManager.findOne(Books, { where: { authorId: authorId, id: id } });
                if (!book) {
                    throw new StatusError('Book not found', 404);
                }

                const pages = await transactionalEntityManager.find(BooksPages, { where: { authorId: authorId, bookId: book.id } });
                for (const page of pages) {
                    await transactionalEntityManager.remove(page);
                }

                const deleted = await transactionalEntityManager.remove(book);
                return deleted;
            });
        }, 'Book not deleted', 500);
    }


    async updateBookById(authorId: number, id: number, updateData: Partial<Books>): Promise<Books> {
        if (!updateData || Object.keys(updateData).length === 0 || !id || !authorId) {
            throw new StatusError('Bad request', 400);
        }

        isNumber(authorId, 'authorId');
        isNumber(id, 'id');

        updateData.name && (isScriptInjection(updateData.name), isSqlInjection(updateData.name));
        updateData.description && (isScriptInjection(updateData.description), isSqlInjection(updateData.description));
        updateData.authors && (isScriptInjection(updateData.authors), isSqlInjection(updateData.authors));
        updateData.authorDescription && (isScriptInjection(updateData.authorDescription), isSqlInjection(updateData.authorDescription));
        updateData.previewImgUrl && (isScriptInjection(updateData.previewImgUrl), isSqlInjection(updateData.previewImgUrl));

        return reqBuilder(async () => {
            let book = await this.bookRepository.findOneBy({ id });
            if (!book) {
                throw new StatusError('Book not found', 404);
            }
            this.bookRepository.merge(book, updateData);
            return await this.bookRepository.save(book);
        }, 'Book not updated', 500);
    }

    // Client-related methods
    async getBookById(id: number): Promise<Books> {
        isNumber(id, 'id');

        return reqBuilder(async () => {
            return await this.bookRepository.findOneBy({ id });
        }, 'Book not found', 404);
    }

    async getBookByName(name: string): Promise<Books> {
        isSqlInjection(name);
        isScriptInjection(name);

        return reqBuilder(async () => {
            return await this.bookRepository.findOneBy({ name });
        }, 'Book not found', 404);
    }

    async getAllBooksLike(name: string): Promise<Books[]> {
        isSqlInjection(name);
        isScriptInjection(name);

        return reqBuilder(async () => {
            return await this.bookRepository.find({ where: { name: Like(`%${name}%`) } });
        }, 'Books not found', 404);
    }

    async getAllBooks(): Promise<Books[]> {
        return reqBuilder(async () => {
            return await this.bookRepository.find();
        }, 'Books not found', 500);
    }

    async createBook(Book: Book): Promise<Books> {
        isSqlInjection(Book.name);
        isSqlInjection(Book.description);
        isScriptInjection(Book.previewImgUrl);
        isNumber(Book.bookPrice, 'bookPrice');
        isNumber(Book.pagesCount, 'pagesCount');

        return reqBuilder(async () => {
            const book = this.bookRepository.create(Book);
            return await this.bookRepository.save(book);
        }, 'Book not created', 500);
    }
}

export default new BooksService();