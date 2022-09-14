import { UserCapabity } from '../entities/user-access-control.entity';

export class CreateUserAccessControlDto {
  userId: string;

  accessEnable: boolean;

  capability: UserCapabity;
}
