import { inject, injectable } from 'inversify';
import { IExceptionFilter } from './exception.filter.interface';
import { TYPES } from '../type';
import { ILogger } from '../logger/logger.service.interface';
import { NextFunction, Request, Response } from 'express';
import { HTTPError } from './http-error.class';

@injectable()
export class ExceptionFilter implements IExceptionFilter {
	constructor(@inject(TYPES.ILogger) private readonly logger: ILogger) {}

	public catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction): void {
		if (err instanceof HTTPError) {
			this.logger.error(`[${err.context}] Ошибка ${err.statusCode}: ${err.message}`);
			res.status(err.statusCode).json({ err: err.message });
		} else {
			this.logger.error(`${err.message}`);
			res.status(500).json({ err: err.message });
		}
	}
}
