import { inject, injectable } from 'inversify';
import { IUsersService } from './users.service.interface';
import { TYPES } from '../type';
import { IConfigService } from '../config/config.service.interface';
import { User } from './user.entity';
import { UserRegisterDTO } from './dto/user-register.dto';

@injectable()
export class UsersService implements IUsersService {
	constructor(@inject(TYPES.IConfigService) private readonly configService: IConfigService) {}

	public async createUser({ email, name, password }: UserRegisterDTO): Promise<User> {
		const user = new User(email, name);
		const salt = this.configService.get('SALT');
		await user.setPassword(password, Number(salt));
		return user;
	}

	public async validateUser(): Promise<boolean> {
		return true;
	}
}
