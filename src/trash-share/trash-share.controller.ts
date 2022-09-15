import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateTrashShareDto } from './dto/create-trash-share.dto';
import { UpdateTrashShareDto } from './dto/update-trash-share.dto';
import { TrashShareService } from './trash-share.service';

@Controller('trash-share')
export class TrashShareController {
  constructor(private readonly trashShareService: TrashShareService) {}

  @Post()
  create(@Body() createTrashShareDto: CreateTrashShareDto) {
    return this.trashShareService.create(createTrashShareDto);
  }

  @Get('/by-user/:userId')
  findAllByUserId(@Param('userId') userId: string) {
    return this.trashShareService.findAll({ user: { id: userId } }, ['user', 'address']);
  }

  @Get('/by-user-address/:addressId')
  findAllByAddressId(@Param('addressId') addressId: string) {
    return this.trashShareService.findAll({ address: { id: addressId } }, [
      'user',
      'address',
    ]);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trashShareService.findOne(id, {}, ['user', 'address']);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrashShareDto: UpdateTrashShareDto) {
    return this.trashShareService.update(id, updateTrashShareDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trashShareService.remove(id);
  }
}
