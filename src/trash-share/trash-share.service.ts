import { ApplicationException } from '@app/app.exception';
import { BaseService } from '@app/common';
import { UserAddressService } from '@app/user-address/user-address.service';
import { UserService } from '@app/user/user.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTrashShareDto } from './dto/create-trash-share.dto';
import { TrashShare } from './entities/trash-share.entity';
import { trashShareSchema } from './validation/trash-share.schema';

@Injectable()
export class TrashShareService extends BaseService<TrashShare> {
  constructor(
    @InjectRepository(TrashShare)
    private readonly trashShareRepo: Repository<TrashShare>,
    private readonly userService: UserService,
    private readonly userAddressService: UserAddressService
  ) {
    super(trashShareRepo);
  }

  async create(createTrashShareDto: CreateTrashShareDto) {
    try {
      await trashShareSchema.validate(createTrashShareDto, { abortEarly: false });
    } catch (previous) {
      throw ApplicationException.validationException(
        'Invalid trash share data',
        previous
      );
    }

    const { addressId, userId } = createTrashShareDto;
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw ApplicationException.objectNotFound(
        'Unable  to find a user with provided id'
      );
    }
    const address = await this.userAddressService.findOne(addressId, {
      user: { id: user.id },
    });
    if (!address) {
      throw ApplicationException.objectNotFound(
        'Unable to find a address with provided address id and user id'
      );
    }

    try {
      const newTrashShare = await this.trashShareRepo.save({
        ...createTrashShareDto,
        user,
        address,
      });
      return newTrashShare;
    } catch (previous) {
      throw ApplicationException.executionException(
        'Unable to create a new trash share',
        previous
      );
    }
  }
}
