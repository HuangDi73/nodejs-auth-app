import { UserLoginDTO } from './dto/user-login.dto';
import { UserRegisterDTO } from './dto/user-register.dto';
import { User } from './user.entity';

export interface IUsersService {
	createUser: (dto: UserRegisterDTO) => Promise<User>;
	validateUser: (dto: UserLoginDTO) => Promise<boolean>;
}
