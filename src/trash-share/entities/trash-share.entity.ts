import { UserAddress } from '@app/user-address/entities/user-address.entity';
import { User } from '@app/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum TrashType {
  PLASTIC = 'PLASTIC',
  ORGANIC = 'ORGANIC',
  METAL = 'METAL',
  OTHER = 'OTHER',
}

export enum OccursEvery {
  WEEK = 'WEEK',
  MONTH = 'MONTH',
  ONCE = 'ONCE',
}

export enum WeekDays {
  Monday = 0,
  Tuesday = 1,
  Wednesday = 2,
  Thursday = 3,
  Friday = 4,
  Saturday = 5,
  Sunday = 6,
}

@Entity()
export class TrashShare {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, user => user.shares)
  user: User;

  @ManyToOne(() => UserAddress)
  address: UserAddress;

  @Column('simple-enum')
  trashType: TrashType;

  @Column('text', { nullable: true })
  trashTypeDescription: string;

  @Column('int')
  intendedDay: WeekDays;

  @Column('simple-enum')
  occursEvery: OccursEvery;
}
