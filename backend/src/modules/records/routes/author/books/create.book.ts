import express, { Request, Response, NextFunction } from 'express';
import { getCookie } from '../../helper/cookieGetter';
import { Role, Author } from '../../../models/user.models';

const createBookRouter = express.Router();


createBookRouter.post('/book', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const permission = await Role.createRole(getCookie(req, 'access_token'), 'author') as Author;

        console.log(req.body.book)
        const book = await permission.createBook(req.body.book);
    
        return res.status(200).json({ message: 'Book created successfully', book: book });
    } catch (err) {
        next(err);
    }
});

export default createBookRouter;