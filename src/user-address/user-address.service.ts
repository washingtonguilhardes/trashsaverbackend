import { ApplicationException } from '@app/app.exception';
import { BaseService } from '@app/common';
import { UserService } from '@app/user/user.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserAddressDto } from './dto/create-user-address.dto';
import { UserAddress } from './entities/user-address.entity';
import { userAddressValidator } from './validation/user-address.schema';

@Injectable()
export class UserAddressService extends BaseService<UserAddress> {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(UserAddress)
    private readonly userAddressRepo: Repository<UserAddress>
  ) {
    super(userAddressRepo);
  }

  async create(createUserAddressDto: CreateUserAddressDto) {
    const { userId } = createUserAddressDto;

    if (!userId) {
      throw ApplicationException.invalidParameter<UserAddress>(
        ['user'],
        'You should provide a valid user id'
      );
    }

    try {
      await userAddressValidator.validate(createUserAddressDto, { abortEarly: false });
    } catch (previous) {
      throw ApplicationException.validationException('Invalid user address.', previous);
    }

    const user = await this.userService.findOne(userId);
    if (!user) {
      throw ApplicationException.validationException('User not fount with provided id');
    }

    try {
      const userAddress = await this.userAddressRepo.save({
        ...createUserAddressDto,
        user,
      });
      return userAddress;
    } catch (previous) {
      throw ApplicationException.executionException(
        'Unable to add new user address',
        previous
      );
    }
  }
}
