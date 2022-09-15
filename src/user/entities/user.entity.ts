import { UserAddress } from '@app/user-address/entities/user-address.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  COLLECTOR = 'COLLECTOR',
  SHARER = 'SHARER',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  externalId: string;

  @Column('text')
  username: string;

  @Column('text')
  useremail: string;

  @Column('simple-array')
  roles: UserRole[];

  @OneToMany(() => UserAddress, address => address.user)
  addresses: UserAddress[];
}
