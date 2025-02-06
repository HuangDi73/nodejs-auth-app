import 'reflect-metadata';
import express, { Express } from 'express';
import { inject, injectable } from 'inversify';
import { TYPES } from './type';
import { ILogger } from './logger/logger.service.interface';
import { UsersController } from './users/users.controller';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { json } from 'body-parser';

@injectable()
export class App {
	private app: Express;
	private port: number;

	constructor(
		@inject(TYPES.ILogger) private readonly logger: ILogger,
		@inject(TYPES.IUsersController) private readonly usersController: UsersController,
		@inject(TYPES.IExceptionFilter) private readonly exceptionFilter: IExceptionFilter,
	) {
		this.app = express();
		this.port = 8000;
	}

	private useMiddlewares(): void {
		this.app.use(json());
	}

	private useRoutes(): void {
		this.app.use('/users', this.usersController.router);
	}

	private useExceptionFilter(): void {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
	}

	public init(): void {
		this.useMiddlewares();
		this.useRoutes();
		this.useExceptionFilter();
		this.app.listen(this.port);
		this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
	}
}
