import { Controller, Post, Body ,Get,UseGuards,Request} from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UserService } from './user.services';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async registerUser(
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('confirmPassword') confirmPassword: string,
    @Body('email') email: string,
    @Body('firstname') firstname: string,
    @Body('lastname') lastname: string,
  ) {
    return this.userService.registerUser(
      username,
      password,
      confirmPassword,
      email,
      firstname,
      lastname,
    );
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getUserProfile(@Request() req)
  {
    const userId=req.user.id;
    const user=await this.userService.findOneWithAddress(userId)
    return user;
  }


}
