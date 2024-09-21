import express, { Request, Response, NextFunction } from 'express';
import { getCookie } from '../../helper/cookieGetter';
import { Role, Author } from '../../../models/user.models';

const updateBookRouter = express.Router();

updateBookRouter.put('/book/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const permission = await Role.createRole(getCookie(req, 'access_token'), 'author') as Author;

        const book = await permission.updateBook(Number(req.body.id), req.body.book);
    
        return res.status(200).json({ message: 'Book updated successfully', book: book });
    } catch (err) {
        next(err);
    }
});

export default updateBookRouter;