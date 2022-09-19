import { ApplicationException } from '@app/app.exception';
import { BaseService } from '@app/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserRole } from './entities/user.entity';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {
    super(userRepository);
  }

  async create(createUserDto: CreateUserDto) {
    const { roles = [], useremail, username } = createUserDto;

    if (!useremail || !username) {
      throw ApplicationException.invalidParameter<CreateUserDto>([
        'useremail',
        'username',
      ]);
    }
    const registeredUser = await this.userRepository.findOne({
      useremail: Like(useremail),
    });
    if (registeredUser) {
      return registeredUser;
    }

    try {
      return await this.userRepository.save({
        useremail,
        username,
        externalId: '',
        roles,
      });
    } catch (error) {
      throw ApplicationException.executionException('Unable to create user', error);
    }
  }

  async updateRoles(id: string, roles: UserRole[] = []): Promise<User> {
    const rolesToApply = roles.filter(r => {
      return r === UserRole.COLLECTOR || r === UserRole.SHARER;
    });

    if (!rolesToApply.length) {
      throw ApplicationException.invalidParameter(['roles'], 'Invalid role value');
    }
    const user = await this.findOne(id);

    user.roles = rolesToApply;
    await this.update(id, user);
    return user;
  }
}
