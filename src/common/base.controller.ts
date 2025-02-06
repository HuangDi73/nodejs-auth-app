import { Response, Router } from 'express';
import { ExpressReturnType, IControllerRoute } from './route.interface';
import { inject } from 'inversify';
import { TYPES } from '../type';
import { ILogger } from '../logger/logger.service.interface';

export class BaseController {
	private readonly _router: Router;

	constructor(@inject(TYPES.ILogger) private readonly loggerService: ILogger) {
		this._router = Router();
	}

	get router(): Router {
		return this._router;
	}

	protected send<T>(res: Response, code: number, message: T): ExpressReturnType {
		return res.status(200).json(message);
	}

	protected ok<T>(res: Response, message: T): ExpressReturnType {
		return res.status(200).json(message);
	}

	protected created<T>(res: Response, message?: T): ExpressReturnType {
		return res.status(201).json(message);
	}

	protected bindRoutes(routes: IControllerRoute[]): void {
		for (const route of routes) {
			this.loggerService.log(`[${route.method.toUpperCase()}] ${route.path}`);
			const handler = route.func.bind(this);
			this.router[route.method](route.path, handler);
		}
	}
}
