import { Response, Request, NextFunction } from 'express';

export type ExpressRoute = (req: Request, res: Response, next: NextFunction) => void;