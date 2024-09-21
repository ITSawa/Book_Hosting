import { Request, Response, NextFunction } from 'express';
declare const routeHandler: (handler: (req: Request, res: Response, next: NextFunction) => Promise<any>) => (req: Request, res: Response, next: NextFunction) => Promise<any>;
export default routeHandler;
//# sourceMappingURL=routeBuilder.d.ts.map