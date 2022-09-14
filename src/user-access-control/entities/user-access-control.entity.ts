import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserCapabity {
  ADMIN = 'ADMIN',
  UNAUTHORIZED_ENABLE = 'UNAUTHORIZED_ENABLE',
  EDITOR = 'EDITOR',
}

@Entity()
export class UserAccessControl {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  accessEnable: boolean;

  @Column()
  tenant: string;

  @Column('simple-enum')
  capability: UserCapabity;
}
