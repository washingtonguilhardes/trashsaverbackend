import { UserAddressModule } from '@app/user-address/user-address.module';
import { UserModule } from '@app/user/user.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrashShare } from './entities/trash-share.entity';
import { TrashShareController } from './trash-share.controller';
import { TrashShareService } from './trash-share.service';

@Module({
  controllers: [TrashShareController],
  providers: [TrashShareService],
  imports: [TypeOrmModule.forFeature([TrashShare]), UserAddressModule, UserModule],
  exports: [TrashShareService],
})
export class TrashShareModule {}
