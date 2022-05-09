import { UnauthorizedException } from '@nestjs/common';
import { PlayersService } from 'src/players/providers/player/player.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDTO } from './DTO/authDTO';
import { Player } from '../players/models/player/player.entity';
export declare class AuthService {
    private playersService;
    private jwtService;
    constructor(playersService: PlayersService, jwtService: JwtService);
    validatePlayer(name: string, pass: string): Promise<Player | null>;
    login(dto: AuthDTO): Promise<any | UnauthorizedException>;
}
