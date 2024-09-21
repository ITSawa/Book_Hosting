import { Repository } from 'typeorm';
import { BooksPages } from '../dbmodels/BooksPages';
import { Books } from '../dbmodels/Books';
import { StatusError } from '../../answers/errorStatus';
import { AppDataSource } from '../pg.connect.init';
import { reqBuilder } from './helpers/reqhelpers';
import { Like } from 'typeorm';
import { isNumber, isSqlInjection, isScriptInjection } from './helpers/validations';

export interface Page {
    bookId: number,
    name: string,
    pageNumber: number,
    authorId: number,
    authors: string,
    title: string,
    content: string,
    matrix: string
}

class PagesAuthorService {
    private booksPagesRepository: Repository<BooksPages>;
    private booksRepository: Repository<Books>;

    constructor() {
        this.booksPagesRepository = AppDataSource.getRepository(BooksPages);
        this.booksRepository = AppDataSource.getRepository(Books);
    }

    async getPagesByBookId(authorId: number, bookId: number, pageNumber: number = 0): Promise<BooksPages[]> {
        isNumber(authorId, 'authorId');
        isNumber(bookId, 'bookId');
        isNumber(pageNumber, 'pageNumber');

        return reqBuilder(async () => {
            return await this.booksPagesRepository.find({ where: { authorId, bookId, pageNumber } });
        }, 'Pages not found', 404);
    }

    async deletePageById(authorId: number, id: number): Promise<void> {
        isNumber(authorId, 'authorId');
        isNumber(id, 'id');

        return reqBuilder(async () => {
            const page = await this.booksPagesRepository.findOneBy({ id, authorId });
            if (!page) {
                throw new StatusError('Page not found', 404);
            }
            await this.booksPagesRepository.remove(page);
        }, 'Page not deleted', 500);
    }

    async updatePageById(authorId: number, id: number, updateData: Partial<BooksPages>): Promise<BooksPages> {
        isNumber(authorId, 'authorId');
        isNumber(id, 'id');

        if (updateData.title) isScriptInjection(updateData.title);
        if (updateData.content) isScriptInjection(updateData.content);
        if (updateData.matrix) isScriptInjection(updateData.matrix);

        return reqBuilder(async () => {
            let page = await this.booksPagesRepository.findOneBy({ id, authorId });
            if (!page) {
                throw new StatusError('Page not found', 404);
            }
            this.booksPagesRepository.merge(page, updateData);
            return await this.booksPagesRepository.save(page);
        }, 'Page not updated', 500);
    }

    // async getOwnedPageById(authorId: number, pageNumber: number, bookId: number): Promise<BooksPages> {
    //     isNumber(authorId, 'authorId');
    //     isNumber(pageNumber, 'pageNumber');

    //     return reqBuilder(async () => {
    //         return await this.booksPagesRepository.findOneBy({ authorId, pageNumber, bookId });
    //     }, 'Page not found', 404);
    // }

    async getOwnedPageById(authorId: number, pageNumber: number, bookId: number): Promise<{ page: BooksPages, pagesCount: number }> {
        isNumber(authorId, 'authorId');
        isNumber(pageNumber, 'pageNumber');
    
        return reqBuilder(async () => {
            const page = await this.booksPagesRepository.findOneBy({ authorId, pageNumber, bookId });
            if (!page) { throw new StatusError('Page not found', 404) };
            const book = await this.booksRepository.findOneBy({ id: bookId });
            if (!book) { throw new StatusError('Book not found', 404) };
            const pagesCount = book.pagesCount;
            return {
                ...page,
                pagesCount
            };
        }, 'Page not found', 404);
    }

    async getAllOwnedPagesByBookId(authorId: number, bookId: number): Promise<BooksPages[]> {
        isNumber(authorId, 'authorId');
        isNumber(bookId, 'bookId');

        return reqBuilder(async () => {
            return await this.booksPagesRepository.find({ where: { authorId, bookId } });
        }, 'Pages not found', 404);
    }

    async getLastPageByBookId(authorId: number, bookId: number): Promise<BooksPages> {
        isNumber(authorId, 'authorId');
        isNumber(bookId, 'bookId');

        return reqBuilder(async () => {
            const pages = await this.booksPagesRepository.find({
                where: { authorId, bookId },
                order: { pageNumber: 'DESC' },
                take: 1
              });
            return pages[0];
        }, 'Page not found', 404);
    }

    async createPage(page: Page): Promise<BooksPages> {
        isNumber(page.bookId, 'bookId');
        isNumber(page.authorId, 'authorId');
        isScriptInjection(page.title);
        isScriptInjection(page.content);
        isScriptInjection(page.matrix);
    
        return reqBuilder(async () => {
            return await AppDataSource.transaction(async transactionalEntityManager => {
                const book = await transactionalEntityManager.findOne(Books, { where: { id: page.bookId } });
                if (!book) {
                    throw new StatusError('Book not found', 404);
                }
                const pageNumber = book.pagesCount + 1;
                book.pagesCount = pageNumber;
    
                await transactionalEntityManager.save(book);
    
                const newPage = transactionalEntityManager.create(BooksPages, { ...page, pageNumber, name: book.name, url: book.url });
                return await transactionalEntityManager.save(newPage);
            });
        }, 'Page not created', 500);
    }
}

export default new PagesAuthorService();