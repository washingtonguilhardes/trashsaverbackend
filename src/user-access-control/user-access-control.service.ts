import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserAccessControlDto } from './dto/create-user-access-control.dto';
import { UpdateUserAccessControlDto } from './dto/update-user-access-control.dto';
import { UserAccessControl } from './entities/user-access-control.entity';

@Injectable()
export class UserAccessControlService {
  constructor(
    @InjectRepository(UserAccessControl)
    private readonly accessControlRepo: Repository<UserAccessControl>
  ) {}

  create(createUserAccessControlDto: CreateUserAccessControlDto) {
    return this.accessControlRepo.save({
      ...createUserAccessControlDto,
      tenant: process.env['MSAL_TENANT_ID'],
    });
  }

  async getUserAccess(userId: string): Promise<UserAccessControl | null> {
    const accessControl = await this.accessControlRepo.findOne({
      where: { userId, tenant: process.env['MSAL_TENANT_ID'] },
    });
    if (!accessControl) {
      return null;
    }
    return accessControl;
  }

  findAll() {
    return this.accessControlRepo.find();
  }

  async update(id: string, updateUserAccessControlDto: UpdateUserAccessControlDto) {
    await this.accessControlRepo.update(id, updateUserAccessControlDto);
    return this.getUserAccess(id);
  }
}
