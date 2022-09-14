import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAccessControl } from './entities/user-access-control.entity';
import { UserAccessControlController } from './user-access-control.controller';
import { UserAccessControlService } from './user-access-control.service';

@Global()
@Module({
  controllers: [UserAccessControlController],
  providers: [UserAccessControlService],
  exports: [UserAccessControlService],
  imports: [TypeOrmModule.forFeature([UserAccessControl])],
})
export class UserAccessControlModule {}
