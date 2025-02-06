import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './app';
import { TYPES } from './type';
import { LoggerService } from './logger/logger.service';
import { ILogger } from './logger/logger.service.interface';

interface IBootstrapReturn {
	app: App;
	appContainer: Container;
}

const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<App>(TYPES.App).to(App);
	bind<ILogger>(TYPES.ILogger).to(LoggerService);
});

function bootstrap(): IBootstrapReturn {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.App);
	app.init();

	return { app, appContainer };
}

export const { app, appContainer } = bootstrap();
