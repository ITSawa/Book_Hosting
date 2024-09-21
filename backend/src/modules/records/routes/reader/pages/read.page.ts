import express, { Request, Response, NextFunction } from 'express';
import { getCookie } from '../../helper/cookieGetter';
import { Role, Reader } from '../../../models/user.models';

const readPagesReaderRouter = express.Router();

readPagesReaderRouter.get('/page/id/:id/:bookId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const permission = await Role.createRole(getCookie(req, 'access_token'), 'reader') as Reader;

        const book = await permission.getPage(Number(req.params.id), Number(req.params.bookId));
    
        return res.status(200).json({ message: 'Book read successfully', data: book });
    } catch (err) {
        next(err);
    }
});

export default readPagesReaderRouter;