import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './app';
import { TYPES } from './type';
import { LoggerService } from './logger/logger.service';
import { ILogger } from './logger/logger.service.interface';
import { UsersController } from './users/users.controller';
import { IUsersController } from './users/users.controller.interface';

interface IBootstrapReturn {
	app: App;
	appContainer: Container;
}

const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<App>(TYPES.App).to(App);
	bind<ILogger>(TYPES.ILogger).to(LoggerService);
	bind<IUsersController>(TYPES.IUsersController).to(UsersController);
});

function bootstrap(): IBootstrapReturn {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.App);
	app.init();

	return { app, appContainer };
}

export const { app, appContainer } = bootstrap();
