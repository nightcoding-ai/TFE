import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PlayersService } from 'src/players/providers/player/player.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDTO } from './DTO/authDTO';
import { Player } from '../players/models/player/player.entity';
const argon2 = require('argon2');


@Injectable()
export class AuthService {
    constructor(
        private playersService: PlayersService,
        private jwtService: JwtService
    ) {}

    /**
     * Vérifie si le joueur existe selon son nom et celui-ci existe, une vérification est faite sur le mot de passe.
     * @param {string} name - Le nom du joueur à vérifier
     * @param {string} pass - Le mot de passe à vérifier s'il corrrespond bien.
     * @returns {Player | null} le joueur s'il existe est renvoyé si non {null} s'il n'existe pas ou si le mot de passe ne correspond pas.
     */
    async validatePlayer(name: string, pass: string): Promise<Player | null> {
        const player = await this.playersService.getOneByName(name);
        if (player && (await argon2.verify(player.profile.password,pass))) {
            return player;
        }
        return null;
    }

    /**
     * Fonction qui permet de se connecter et de recevoir le auth_token permettant l'accès aux différentes requêtes qui demandent d'être connecté.
     * @param {AuthDTO} dto - L'objet représentant les données pour se connecter, soit le nom et le mot de passe. 
     * @returns {any | UnauthorizedException} renvoir le token d'accès avec dedans l'id unique du joueur.
     */
    async login(dto: AuthDTO): Promise<any | UnauthorizedException> {
        const player = await this.validatePlayer(dto.name, dto.password);
        if (!player) {
            throw new UnauthorizedException();
        }
        const payload = { id: player.id };
        return { acces_token: this.jwtService.sign(payload) };
    }
}

