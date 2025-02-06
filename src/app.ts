import 'reflect-metadata';
import express, { Express } from 'express';
import { inject, injectable } from 'inversify';
import { TYPES } from './type';
import { ILogger } from './logger/logger.service.interface';
import { UsersController } from './users/users.controller';

@injectable()
export class App {
	private app: Express;
	private port: number;

	constructor(
		@inject(TYPES.ILogger) private readonly logger: ILogger,
		@inject(TYPES.IUsersController) private readonly usersController: UsersController,
	) {
		this.app = express();
		this.port = 8000;
	}

	private useRoutes(): void {
		this.app.use('/users', this.usersController.router);
	}

	public init(): void {
		this.useRoutes();
		this.app.listen(this.port);
		this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
	}
}
