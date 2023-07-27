import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,BeforeInsert
} from 'typeorm';
import { Address } from './address/address.entity';
import * as bcrypt from 'bcryptjs';

@Entity()
@Unique(['username', 'email'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

   @OneToMany(() => Address, (address) => address.user)
   addresses: Address[];

   @BeforeInsert()
   async hashPassword() {
     this.password = await bcrypt.hash(this.password, 10);
   }
 
   async comparePassword(attempt: string): Promise<boolean> {
     return await bcrypt.compare(attempt, this.password);
   }
}
