import { TrashShare } from '@app/trash-share/entities/trash-share.entity';
import { User } from '@app/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum TrashCollectStatus {
  WAITING = 'WAITING',
  IN_PROGRESS = 'IN_PROGRESS',
  COLLECTED = 'COLLECTED',
  DONE = 'DONE',
}

@Entity()
export class TrashCollect {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  collector: User;

  @OneToOne(() => TrashShare)
  @JoinColumn()
  shareInfo: TrashShare;

  @Column('simple-enum')
  trashCollectStatus: TrashCollectStatus;
}
