import { inject, injectable } from 'inversify';
import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { IUsersController } from './users.controller.interface';
import { TYPES } from '../type';
import { ILogger } from '../logger/logger.service.interface';
import { HTTPError } from '../errors/http-error.class';
import { IUsersService } from './users.service.interface';
import { UserRegisterDTO } from './dto/user-register.dto';

@injectable()
export class UsersController extends BaseController implements IUsersController {
	constructor(
		@inject(TYPES.ILogger) private readonly logger: ILogger,
		@inject(TYPES.IUsersService) private readonly usersService: IUsersService,
	) {
		super(logger);
		this.bindRoutes([
			{ method: 'post', path: '/login', func: this.login },
			{ method: 'post', path: '/register', func: this.register },
		]);
	}

	public login(req: Request, res: Response, next: NextFunction): void {
		next(new HTTPError(401, 'Ошибка авторизации!', '/login'));
		// this.send(res, 200, { message: 'Hello!' });
	}

	public async register(
		{ body }: Request<{}, {}, UserRegisterDTO>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const user = await this.usersService.createUser(body);
		this.created(res, { success: user });
	}
}
