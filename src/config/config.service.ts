import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
import { IConfigService } from './config.service.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../type';
import { ILogger } from '../logger/logger.service.interface';

@injectable()
export class ConfigService implements IConfigService {
	private config: DotenvParseOutput;

	constructor(@inject(TYPES.ILogger) private readonly logger: ILogger) {
		const result: DotenvConfigOutput = config();
		if (result.error) {
			this.logger.error(`[ConfigService] Не удалось прочитать файл .env или он отсутствует.`);
		} else {
			this.logger.log('[ConfigService] Конфигурация .env загружена.');
			this.config = result.parsed as DotenvParseOutput;
		}
	}

	public get(key: string): string {
		return this.config[key];
	}
}
