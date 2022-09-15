import { ApplicationException } from '@app/app.exception';
import { BaseService } from '@app/common';
import { TrashShareService } from '@app/trash-share/trash-share.service';
import { UserService } from '@app/user/user.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTrashCollectDto } from './dto/create-trash-collect.dto';
import { UpdateTrashCollectDto } from './dto/update-trash-collect.dto';
import { TrashCollect, TrashCollectStatus } from './entities/trash-collect.entity';
import { trashCollectSchema } from './validation/trash-collect.schema';

@Injectable()
export class TrashCollectService extends BaseService<TrashCollect> {
  constructor(
    private readonly userService: UserService,
    private readonly trashShareService: TrashShareService,
    @InjectRepository(TrashCollect)
    private readonly trashCollectRepo: Repository<TrashCollect>
  ) {
    super(trashCollectRepo);
  }

  async create(createTrashCollectDto: CreateTrashCollectDto) {
    try {
      await trashCollectSchema('creating').validate(createTrashCollectDto, {
        abortEarly: false,
      });
    } catch (previous) {
      throw ApplicationException.validationException(
        'Invalid trash collect data',
        previous
      );
    }
    const { collectorId, trashShareId } = createTrashCollectDto;
    const collector = await this.userService.findOne(collectorId);
    const shareInfo = await this.trashShareService.findOne(trashShareId, {}, ['user']);

    if (!collector) {
      throw ApplicationException.objectNotFound('Unable to found collector');
    }

    if (!shareInfo) {
      throw ApplicationException.objectNotFound('Unable to found trash sharer');
    }

    if (shareInfo.user.id === collector.id) {
      throw ApplicationException.validationException(
        'Colletor must be different from sharer'
      );
    }
    try {
      return await this.trashCollectRepo.save({
        collector,
        shareInfo,
        trashCollectStatus: TrashCollectStatus.WAITING,
      });
    } catch (previous) {
      throw ApplicationException.executionException(
        'Unable to create collectior relation',
        previous
      );
    }
  }

  async updateStatus(id: string, updateTrashCollectDto: UpdateTrashCollectDto) {
    const { trashCollectStatus } = updateTrashCollectDto;
    const trashCollect = await this.findOne(id, {}, ['collector']);
    if (!trashCollect) {
      throw ApplicationException.objectNotFound('Unable to find trash collect');
    }
    if (trashCollect.trashCollectStatus === TrashCollectStatus.DONE) {
      throw ApplicationException.executionException(
        'garbage collection already completed'
      );
    }

    try {
      await trashCollectSchema('updating').validate(
        {
          trashCollectStatus,
        },
        { abortEarly: false }
      );
    } catch (previous) {
      throw ApplicationException.validationException(
        'Unable to update grabage collection status',
        previous
      );
    }

    try {
      trashCollect.trashCollectStatus = trashCollectStatus;
      return await this.trashCollectRepo.save(trashCollect);
    } catch (previous) {
      throw ApplicationException.executionException(
        'Unable to update garbage collection status',
        previous
      );
    }
  }
}
