
import { Strategy } from 'passport-local';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {

  constructor(private authService: AuthService) {
    super();
  }

  async validate(playername: string, password: string): Promise<any> {

    const player = await this.authService.validatePlayer(playername, password);


    if (!player) {
        throw new UnauthorizedException();
    }
    return player;
;
  }
}


