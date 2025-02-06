import { inject } from 'inversify';
import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { IUsersController } from './users.controller.interface';
import { TYPES } from '../type';
import { ILogger } from '../logger/logger.service.interface';

export class UsersController extends BaseController implements IUsersController {
	constructor(@inject(TYPES.ILogger) private readonly logger: ILogger) {
		super(logger);
		this.bindRoutes([
			{ method: 'post', path: '/login', func: this.login },
			{ method: 'post', path: '/register', func: this.register },
		]);
	}

	public login(req: Request, res: Response, next: NextFunction): void {
		this.send(res, 200, { message: 'Hello!' });
	}

	public register(req: Request, res: Response, next: NextFunction): void {}
}
