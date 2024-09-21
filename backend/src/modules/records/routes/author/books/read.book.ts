import express, { Request, Response, NextFunction } from 'express';
import { getCookie } from '../../helper/cookieGetter';

import { Role, Author } from '../../../models/user.models';

const readBookRouter = express.Router();

readBookRouter.get('/book/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const permission = await Role.createRole(getCookie(req, 'access_token'), 'author') as Author;

        const book = await permission.getBook(Number(req.params.id));
    
        return res.status(200).json({ message: 'Book read successfully', book: book });
    } catch (err) {
        next(err);
    }
});

readBookRouter.get('/books', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const permission = await Role.createRole(getCookie(req, 'access_token'), 'author') as Author;

        const books = await permission.getBooks();
    
        return res.status(200).json({ message: 'Books read successfully', books: books });
    } catch (err) {
        next(err);
    }
})

export default readBookRouter;