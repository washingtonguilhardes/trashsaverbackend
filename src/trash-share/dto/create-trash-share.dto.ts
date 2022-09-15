import { OccursEvery, TrashType } from '../entities/trash-share.entity';

export class CreateTrashShareDto {
  userId: string;

  addressId: string;

  trashType: TrashType;

  trashTypeDescription: string;

  intendedDay: number;

  occursEvery: OccursEvery;
}
