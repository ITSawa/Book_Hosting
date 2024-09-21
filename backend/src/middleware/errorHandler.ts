import { Request, Response, NextFunction } from 'express';
import { StatusError } from '../inits/answers/errorStatus';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    // console.error(err);

    if (err instanceof StatusError) {
        return res.status(err.status).json({
            error: {
                message: err.message
            }
        });
    }

    return res.status(500).json({
        error: {
            message: 'Internal Server Error'
        }
    });
};

export default errorHandler;