import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PlayersService } from 'src/players/providers/player/player.service';
import { JwtService } from '@nestjs/jwt';
import { PlayerDTO } from 'src/players/DTO/player/playerDTO';
import { AuthDTO } from './DTO/authDTO';
import { SignUpDTO } from './DTO/signUpDTO';
const argon2 = require('argon2');


@Injectable()
export class AuthService {
    constructor(
        private playersService: PlayersService,
        private jwtService: JwtService) {}

    async validatePlayer(name: string, pass: string): Promise<PlayerDTO> {

        const player = await this.playersService.getOneByName(name);


        if (player && (await argon2.verify(player.profile.password,pass))) {


            return player;
        }

        return null;
    }

    async login(dto: AuthDTO) {
        const player = await this.validatePlayer(dto.name, dto.password);

        if (!player) {
            throw new UnauthorizedException();
        }

        const payload = {
            name: player.name, sub: player.profile
        };

        return {
            acces_token: this.jwtService.sign(payload)
        };
    }

    async getProfile(req: any){
      if(req.user){
          const profilePlayer = await this.playersService.getOneByName(req.user.name);

          return profilePlayer;
      }
      return null;
    }
    
 


}

