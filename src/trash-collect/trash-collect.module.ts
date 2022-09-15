import { TrashShareModule } from '@app/trash-share/trash-share.module';
import { UserModule } from '@app/user/user.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrashCollect } from './entities/trash-collect.entity';
import { TrashCollectController } from './trash-collect.controller';
import { TrashCollectService } from './trash-collect.service';

@Module({
  controllers: [TrashCollectController],
  providers: [TrashCollectService],
  imports: [UserModule, TrashShareModule, TypeOrmModule.forFeature([TrashCollect])],
})
export class TrashCollectModule {}
