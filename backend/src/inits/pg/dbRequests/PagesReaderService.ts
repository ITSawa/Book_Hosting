import { Repository } from 'typeorm';
import { Books } from '../dbmodels/Books';
import { BooksPages } from '../dbmodels/BooksPages';
import { Subscriptions } from '../dbmodels/Subscriptions';
import { Purchases } from '../dbmodels/Purchases';
import { StatusError } from '../../answers/errorStatus';
import { isNumber } from './helpers/validations';
 
export interface Page {
    bookId: number,
    name: string,
    authorId: number,
    authors: string,
    title: string,
    content: string,
    positionMatrix: string
}

class PagesReaderService {
    private booksRepository: Repository<Books>;
    private booksPagesRepository: Repository<BooksPages>;
    private subscriptionsRepository: Repository<Subscriptions>;
    private purchasesRepository: Repository<Purchases>;

    constructor(
        booksRepository: Repository<Books>,
        booksPagesRepository: Repository<BooksPages>,
        subscriptionsRepository: Repository<Subscriptions>,
        purchasesRepository: Repository<Purchases>
    ) {
        this.booksRepository = booksRepository;
        this.booksPagesRepository = booksPagesRepository;
        this.subscriptionsRepository = subscriptionsRepository;
        this.purchasesRepository = purchasesRepository;
    }

    async getBookPagesById(userId: number, bookId: number, page: number | 'all'): Promise<BooksPages[]> {
        isNumber(page, 'page');
        isNumber(bookId, 'bookId');
        isNumber(userId, 'userId');

        const book = await this.booksRepository.findOne({ where: { id: bookId } });
        if (!book) {
            throw new StatusError('Book not found', 404);
        }

        if (book.authorId !== userId) {
            if (book.onlySubscribers) {
                const subscription = await this.subscriptionsRepository.findOne({
                    where: { userId, authorId: book.authorId, isActive: true },
                });

                if (!subscription) {
                    throw new StatusError('Access denied. Subscription required.', 403);
                }
            }

            if (book.bookPrice > 0) {
                const purchase = await this.purchasesRepository.findOne({
                    where: { userId, bookId },
                });

                if (!purchase) {
                    throw new StatusError('Access denied. Purchase required.', 403);
                }
            }
        }

        let pages: BooksPages[];
        if (page === 'all') {
            pages = await this.booksPagesRepository.find({ where: { bookId } });
        } else {
            pages = await this.booksPagesRepository.find({ where: { bookId, pageNumber: page } });
        }

        return pages;
    }

    async getBookInfo(bookId: number) {
        return await this.booksRepository.findOne({ where: { id: bookId } });
    }
}

import { AppDataSource } from '../pg.connect.init';

const booksRepository = AppDataSource.getRepository(Books);
const booksPagesRepository = AppDataSource.getRepository(BooksPages);
const subscriptionsRepository = AppDataSource.getRepository(Subscriptions);
const purchasesRepository = AppDataSource.getRepository(Purchases);

const pagesReaderService = new PagesReaderService(
    booksRepository,
    booksPagesRepository,
    subscriptionsRepository,
    purchasesRepository
);

export default pagesReaderService;