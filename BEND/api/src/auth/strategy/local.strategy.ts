
import { Strategy } from 'passport-local';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {

  constructor(private authService: AuthService) {
    super();
  }

  /**
   * Vérifie si le nom de joueur et le mot de passe existent dans la base de données si oui, on renvoie le joueur sinon une erreur 401
   * @param {string} playername - Le nom du joueur à validider
   * @param {string} password - Le mot de passe du joueur à valider 
   * @returns {any | UnauthorizedException} - le joueur ou l'interdiction sous l'erreur 401
   */
  async validate(playername: string, password: string): Promise<any | UnauthorizedException> {
    const player = await this.authService.validatePlayer(playername, password);

    if (!player) {
        throw new UnauthorizedException();
    }
    return player;
;
  }
}


