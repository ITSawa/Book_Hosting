import express, { Request, Response, NextFunction } from 'express';
import { getCookie } from '../../helper/cookieGetter';
import { Role, Reader } from '../../../models/user.models';

const readBooksReaderRouter = express.Router();

readBooksReaderRouter.get('/book/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const permission = await Role.createRole(getCookie(req, 'access_token'), 'reader') as Reader;

        const book = await permission.getBook(Number(req.params.id));
    
        return res.status(200).json({ message: 'Book read successfully', data: book });
    } catch (err) {
        next(err);
    }
});

export default readBooksReaderRouter;