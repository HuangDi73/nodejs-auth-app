import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './app';
import { TYPES } from './type';
import { LoggerService } from './logger/logger.service';
import { ILogger } from './logger/logger.service.interface';
import { UsersController } from './users/users.controller';
import { IUsersController } from './users/users.controller.interface';
import { ConfigService } from './config/config.service';
import { IConfigService } from './config/config.service.interface';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { ExceptionFilter } from './errors/exceptrion.filter';
import { IUsersService } from './users/users.service.interface';
import { UsersService } from './users/users.service';

interface IBootstrapReturn {
	app: App;
	appContainer: Container;
}

const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<App>(TYPES.App).to(App);
	bind<ILogger>(TYPES.ILogger).to(LoggerService);
	bind<IUsersController>(TYPES.IUsersController).to(UsersController);
	bind<IConfigService>(TYPES.IConfigService).to(ConfigService);
	bind<IExceptionFilter>(TYPES.IExceptionFilter).to(ExceptionFilter);
	bind<IUsersService>(TYPES.IUsersService).to(UsersService);
});

function bootstrap(): IBootstrapReturn {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.App);
	app.init();

	return { app, appContainer };
}

export const { app, appContainer } = bootstrap();
