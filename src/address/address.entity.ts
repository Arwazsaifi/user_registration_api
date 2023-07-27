import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../user.entity';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

@Entity()
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  street: string;

  @Column()
  city: string;

  @ManyToOne(() => User, (user) => user.addresses)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
