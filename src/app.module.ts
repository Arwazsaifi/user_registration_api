import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';


import { Address } from './address/address.entity';
import { AddressModule } from './address/address.module';

import { UserModule } from './user.module';
import { LoginController } from './login/login.controller';
import { LoginService } from './login/login.service';
import { AuthModule } from './auth/auth.module';
import { UserController } from './user.controller';




@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345678',
      database: 'userData',
      entities: [User,Address],
      synchronize: true,
    }),
    UserModule,
    AddressModule,
    AuthModule
  ],
  controllers:[LoginController,UserController],
  providers:[LoginService]
})
export class AppModule {}
