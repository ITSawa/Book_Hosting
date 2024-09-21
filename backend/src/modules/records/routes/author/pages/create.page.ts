import express, { Request, Response, NextFunction } from 'express';
import { getCookie } from '../../helper/cookieGetter';
import { Role, Author } from '../../../models/user.models';

const createPageRouter = express.Router();

createPageRouter.post('/page', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const permission = await Role.createRole(getCookie(req, 'access_token'), 'author') as Author;

        const page = await permission.createPage(req.body.page);
    
        return res.status(200).json({ message: 'Page created successfully', page: page });
    } catch (err) {
        next(err);
    }
});

export default createPageRouter;