/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,FindOneOptions} from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

 
  async registerUser(
    username: string,
    password: string,
    confirmPassword: string,
    email: string,
    firstname: string,
    lastname: string,
  ): Promise<User> {
    if (password !== confirmPassword) {
      throw new Error('Passwords do not match.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      username,
      password: hashedPassword,
      email,
      firstname,
      lastname,
    });

    return this.userRepository.save(user);
  }
  async findByUsername(username: string): Promise<User | undefined> {
    const options: FindOneOptions<User> = { where: { username } };
    return this.userRepository.findOne(options);
  }

  async findOneWithAddress(userId: number): Promise<User | undefined> {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.addresses', 'address')
      .where('user.id = :id', { id: userId })
      .getOne();
  }s
  
}

