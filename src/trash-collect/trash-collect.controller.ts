import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateTrashCollectDto } from './dto/create-trash-collect.dto';
import { UpdateTrashCollectDto } from './dto/update-trash-collect.dto';
import { TrashCollectService } from './trash-collect.service';

@Controller('trash-collect')
export class TrashCollectController {
  constructor(private readonly trashCollectService: TrashCollectService) {}

  @Post()
  create(@Body() createTrashCollectDto: CreateTrashCollectDto) {
    return this.trashCollectService.create(createTrashCollectDto);
  }

  @Get('/by-user/:userId')
  findAllByUser(@Param('userId') userId: string) {
    return this.trashCollectService.findAll({ collector: { id: userId } }, [
      'collector',
      'shareInfo',
    ]);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trashCollectService.findOne(id, {}, ['collector', 'shareInfo']);
  }

  @Patch(':id')
  updateStatus(
    @Param('id') id: string,
    @Body() updateTrashCollectDto: UpdateTrashCollectDto
  ) {
    return this.trashCollectService.updateStatus(id, updateTrashCollectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trashCollectService.remove(id);
  }
}
