import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserAddressDto } from './dto/create-user-address.dto';
import { UpdateUserAddressDto } from './dto/update-user-address.dto';
import { UserAddressService } from './user-address.service';

@Controller('user-address')
export class UserAddressController {
  constructor(private readonly userAddressService: UserAddressService) {}

  @Post()
  create(@Body() createUserAddressDto: CreateUserAddressDto) {
    return this.userAddressService.create(createUserAddressDto);
  }

  @Get('/by-user/:userId')
  findAllByUserId(@Param('userId') userId: string) {
    return this.userAddressService.findAll({ user: { id: userId } });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userAddressService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserAddressDto: UpdateUserAddressDto) {
    return this.userAddressService.update(id, updateUserAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userAddressService.remove(id);
  }
}
