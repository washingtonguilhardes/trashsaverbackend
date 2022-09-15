import { User } from '@app/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserAddress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  way: string;

  @Column()
  neighborhood: string;

  @Column()
  name: string;

  @Column()
  city: string;

  @Column()
  province: string;

  @Column()
  country: string;

  @ManyToOne(() => User, user => user.addresses)
  user: User;
}
