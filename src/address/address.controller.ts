import { Controller, Post, Body, UseGuards, Request, HttpStatus, HttpException } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AddressService } from './address.service';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createAddress(@Request() req, @Body() createAddressDto: any) {
    try {
      const user = req.user; 
      const address = await this.addressService.createAddress(user.id, createAddressDto);
      return address;
    } catch (error) {
      throw new HttpException('Address creation failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
