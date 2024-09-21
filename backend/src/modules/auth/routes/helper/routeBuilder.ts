import { Request, Response, NextFunction } from 'express';
import { StatusError } from '../../../../inits/answers/errorStatus';

const routeHandler = (handler: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        console.log('Request: ', req.body);

        try {
            return await handler(req, res, next);
        } catch (error) {
            const message = error instanceof StatusError ? error.message : 'Something went wrong';
            const status = error instanceof StatusError ? error.status : 500;
            return res.status(status).json({ message });
        }
    };
};

export default routeHandler;