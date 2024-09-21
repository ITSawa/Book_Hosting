import express, { Request, Response, NextFunction } from 'express';
import { User } from '../models/user.model';
import { cookieAccessOptions, cookieRefreshOptions } from './helper/setCookie';

const logoutRouter = express.Router();

logoutRouter.post('/logout', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const permission = await User.identifyRole(req.cookies.refresh_token, 'refresh_token');

        await permission.logout();

        res.cookie('access_token', '', { ...cookieAccessOptions, maxAge: 0 });
        res.cookie('refresh_token', '', { ...cookieRefreshOptions, maxAge: 0 });

        return res.status(200).json({ message: 'Logged out successfully' });
    } catch (err) {
        next(err);
    }
});

export default logoutRouter;