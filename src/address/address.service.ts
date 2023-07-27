import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './address.entity';
import { User } from '../user.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  async createAddress(userId: number, createAddressDto: any): Promise<Address[]> {
    const address = this.addressRepository.create({
      ...createAddressDto,
      user: { id: userId }, 
    });

    return this.addressRepository.save(address);
  }
}
