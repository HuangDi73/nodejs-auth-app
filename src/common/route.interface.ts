import { NextFunction, Request, Response, Router } from 'express';

export interface IControllerRoute {
	method: keyof Pick<Router, 'get' | 'post' | 'put' | 'patch' | 'delete'>;
	path: string;
	func: (req: Request, res: Response, next: NextFunction) => void;
}

export type ExpressReturnType = Response<any, Record<any, string>>;
