import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  username: string;

  useremail: string;

  externalId: string;

  roles?: UserRole[];
}
