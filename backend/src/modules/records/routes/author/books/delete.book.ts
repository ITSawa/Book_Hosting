import express, { Request, Response, NextFunction } from 'express';
import { getCookie } from '../../helper/cookieGetter';
import { Role, Author } from '../../../models/user.models';

const delelteBookRouter = express.Router();

delelteBookRouter.delete('/book/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const permission = await Role.createRole(getCookie(req, 'access_token'), 'author') as Author;

        console.log('bookId: ', req.body.bookId)
        const book = await permission.deleteBook(Number(req.body.bookId));
    
        return res.status(200).json({ message: 'Book deleted successfully', book: book });
    } catch (err) {
        next(err);
    }
});

export default delelteBookRouter;