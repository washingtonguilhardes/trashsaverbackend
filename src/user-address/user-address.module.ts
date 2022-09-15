import { UserModule } from '@app/user/user.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAddress } from './entities/user-address.entity';
import { UserAddressController } from './user-address.controller';
import { UserAddressService } from './user-address.service';

@Module({
  controllers: [UserAddressController],
  providers: [UserAddressService],
  imports: [TypeOrmModule.forFeature([UserAddress]), UserModule],
})
export class UserAddressModule {}
