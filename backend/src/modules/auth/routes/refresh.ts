import express, { Request, Response, NextFunction } from 'express';
import { User } from '../models/user.model';
import { cookieAccessOptions } from './helper/setCookie';
import type { RefreshData } from '../@types/validation.types';

const refreshRouter = express.Router();

refreshRouter.post('/refresh', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const signedRefreshToken = req.signedCookies['refresh_token'];

        const permission = await User.identifyRole(signedRefreshToken, 'refresh_token');
        const data: RefreshData = await permission.refreshAccess(signedRefreshToken);

        res.cookie('access_token', data.access_token, cookieAccessOptions);

        return res.status(200).json({ message: 'Refreshed successfully', user: data.user });
    } catch (err) {
        next(err);
    }
});

export default refreshRouter;