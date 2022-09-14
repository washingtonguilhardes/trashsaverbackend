import { AuthGuard, Scopes } from '@app/azure-ad.guard';
import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateUserAccessControlDto } from './dto/create-user-access-control.dto';
import { UpdateUserAccessControlDto } from './dto/update-user-access-control.dto';
import { UserCapabity } from './entities/user-access-control.entity';
import { UserAccessControlService } from './user-access-control.service';

@Controller({ path: 'user-access-control', version: '1' })
@UseGuards(AuthGuard)
export class UserAccessControlController {
  constructor(private readonly userAccessControlService: UserAccessControlService) {}

  @Post()
  @Scopes(UserCapabity.ADMIN)
  create(@Body() createUserAccessControlDto: CreateUserAccessControlDto) {
    return this.userAccessControlService.create(createUserAccessControlDto);
  }

  @Get()
  @Scopes(UserCapabity.ADMIN)
  findAll() {
    return this.userAccessControlService.findAll();
  }

  @Get(':id')
  @Scopes(UserCapabity.EDITOR)
  getUserAccess(@Param('id') id: string) {
    return this.userAccessControlService.getUserAccess(id);
  }

  @Patch(':id')
  @Scopes(UserCapabity.ADMIN)
  update(
    @Param('id') id: string,
    @Body() updateUserAccessControlDto: UpdateUserAccessControlDto
  ) {
    return this.userAccessControlService.update(id, updateUserAccessControlDto);
  }
}
