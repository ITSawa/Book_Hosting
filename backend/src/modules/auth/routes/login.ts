import express, { Request, Response, NextFunction } from 'express';
import { Unauthorized } from '../models/user.model';
import { UserData } from '../@types/validation.types';
import { cookieAccessOptions, cookieRefreshOptions } from './helper/setCookie';

const loginRouter = express.Router();

loginRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('Request to login: ', req.body);

        const { email, password } = req.body;

        const permission = new Unauthorized();
        const data: UserData = await permission.login(email, password);

        res.cookie('access_token', data.access_token, cookieAccessOptions);
        res.cookie('refresh_token', data.refresh_token, cookieRefreshOptions);

        return res.status(200).json({ message: 'Logged in successfully', user: data.user });
    } catch (err) {
        next(err);  // Передаем ошибку в middleware
    }
});

export default loginRouter;