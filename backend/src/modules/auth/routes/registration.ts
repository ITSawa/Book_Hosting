import express, { Request, Response, NextFunction } from 'express';
import { Unauthorized } from '../models/user.model';
import { UserData } from '../@types/validation.types';
import { cookieAccessOptions, cookieRefreshOptions } from './helper/setCookie';

const registrationRouter = express.Router();

registrationRouter.post('/registration', async (req: Request, res: Response, next: NextFunction) => {
    try {
    const { name, email, password } = req.body;

    const permission = new Unauthorized();

    const data: UserData = await permission.registration(name, email, password);

    res.cookie('access_token', data.access_token, cookieAccessOptions);
    res.cookie('refresh_token', data.refresh_token, cookieRefreshOptions);

    return res.status(200).json({ message: 'Registered successfully', user: data.user });
    } catch (err) {
        next(err);
    }
});

export default registrationRouter;