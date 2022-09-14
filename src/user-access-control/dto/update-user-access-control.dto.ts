import { PartialType } from '@nestjs/mapped-types';
import { CreateUserAccessControlDto } from './create-user-access-control.dto';

export class UpdateUserAccessControlDto extends PartialType(CreateUserAccessControlDto) {}
