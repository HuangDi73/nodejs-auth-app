import { ILogObj, Logger } from 'tslog';
import { ILogger } from './logger.service.interface';
import { injectable } from 'inversify';

@injectable()
export class LoggerService implements ILogger {
	private logger: Logger<ILogObj>;

	constructor() {
		this.logger = new Logger({
			prettyLogTemplate: '{{yyyy}}.{{mm}}.{{dd}} {{hh}}:{{MM}}:{{ss}}:{{ms}}\t{{logLevelName}}\t',
			prettyLogStyles: {
				logLevelName: {
					DEBUG: ['bold', 'blue'],
					INFO: ['bold', 'green'],
					ERROR: ['bold', 'red'],
				},
			},
		});
	}

	public log(...args: unknown[]): void {
		this.logger.info(...args);
	}

	public warn(...args: unknown[]): void {
		this.logger.warn(...args);
	}

	public error(...args: unknown[]): void {
		this.logger.error(...args);
	}
}
