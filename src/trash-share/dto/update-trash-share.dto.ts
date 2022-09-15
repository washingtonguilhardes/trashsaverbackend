import { PartialType } from '@nestjs/mapped-types';
import { CreateTrashShareDto } from './create-trash-share.dto';

export class UpdateTrashShareDto extends PartialType(CreateTrashShareDto) {}
