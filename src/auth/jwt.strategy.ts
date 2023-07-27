import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { User } from '../user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: '12345', 
    });
  }

  async validate(payload: any): Promise<User> {
    const user = await this.authService.validateUser(payload.username,payload.password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
