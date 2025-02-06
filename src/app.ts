import 'reflect-metadata';
import express, { Express } from 'express';
import { inject, injectable } from 'inversify';
import { TYPES } from './type';
import { ILogger } from './logger/logger.service.interface';

@injectable()
export class App {
	private app: Express;
	private port: number;

	constructor(@inject(TYPES.ILogger) private readonly logger: ILogger) {
		this.app = express();
		this.port = 8000;
	}

	public init(): void {
		this.app.listen(this.port);
		this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
	}
}
