import express, { Request, Response, NextFunction } from 'express';
import { getCookie } from '../../helper/cookieGetter';
import { Role, Author } from '../../../models/user.models';

const createPageRouter = express.Router();

createPageRouter.put('/page/id/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const permission = await Role.createRole(getCookie(req, 'access_token'), 'author') as Author;

        const page = await permission.updatePage(Number(req.params.id), req.body.page);
    
        return res.status(200).json({ message: 'Page deleted successfully', page: page });
    } catch (err) {
        next(err);
    }
});

export default createPageRouter;