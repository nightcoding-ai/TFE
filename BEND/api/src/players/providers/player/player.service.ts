import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { error } from 'console';
import { type } from 'os';
import { CreatePlayerDTO } from 'src/players/DTO/player/CreatePlayerDTO';
import { PlayerDTO } from 'src/players/DTO/player/playerDTO';
import { ProfileDTO } from 'src/players/DTO/profil/profileDTO';
import { RoleEnum } from 'src/players/enum/role.enum';
import { UserType } from 'src/players/enum/userType.enum';
import { PlayerInterface } from 'src/players/interfaces/player.interface';
import { Player } from 'src/players/models/player/player.entity';
import { Profile } from 'src/players/models/profile/profile.entity';
import { PlayerRepository } from 'src/players/repository/player/player.repository';
import { ProfileRepository } from 'src/players/repository/profil/profile.repository';
import { DeleteResult, UpdateResult } from 'typeorm';
const argon2 = import('argon2');

@Injectable()
export class PlayersService {

    constructor(
        private readonly PlayerRepo : PlayerRepository,
        private readonly ProfileRepo : ProfileRepository
    ){ }

    async create(player: PlayerDTO): Promise<PlayerInterface> {
        try {
            const hash =  await (await argon2).hash(player.profile.password);
            player.profile.password = hash;

            return await this.PlayerRepo.addPlayer(player);      
        }
        catch(err){
            throw err;
        }
    }

    async delete(idPlayer: number): Promise<DeleteResult> {
        return await this.PlayerRepo.delPlayer(idPlayer);
    }

    async getOne(idPlayer: number): Promise<Player  | undefined> {
        return await this.PlayerRepo.getOne(idPlayer);
    }

    async getOneByName(playerName: string): Promise<Player | undefined> {
        return await this.PlayerRepo.getOneByName(playerName);
    }

    async getAll(adminId: number): Promise<PlayerInterface[]> {
        const admin = await this.PlayerRepo.getOne(adminId);

        if(admin.userType !== UserType.ADMIN){
            throw new UnauthorizedException('Access denied, admin ressources');
        }
        return await this.PlayerRepo.getAll();
    }

    async getAllFree(): Promise<PlayerInterface[]> {
        return await this.PlayerRepo.getAllFree();
    }

    async getAllByRoleAndFree(roleOfPlayer: RoleEnum): Promise<PlayerInterface[]> {
        return await this.PlayerRepo.getAllByRoleAndFree(roleOfPlayer);
    }

    async getNumberOfPlayer(): Promise<number> {
        return await this.PlayerRepo.getNumberOfPlayers();
    }
    
    async patchPlayer(idPlayer: number, playerDTO: PlayerDTO ): Promise<UpdateResult> {
        return await this.PlayerRepo.updatePlayer(idPlayer, playerDTO);
    }

    async updateProfile(idProfile: number, profileDTO: ProfileDTO): Promise<UpdateResult> {
        return await this.ProfileRepo.updateProfile(idProfile, profileDTO);
    }

    async leaveTeam(idPlayer: number): Promise<PlayerInterface> {
        try {
            const player = await this.PlayerRepo.getOne(idPlayer);

            if(!player || !player.team){
                throw new UnauthorizedException();
            }
            if(player.profile.isCaptain){
                player.team = null;
                player.profile.isCaptain = false;
                await this.PlayerRepo.savePlayer(player);
            }
            player.team = null;
            return await this.PlayerRepo.savePlayer(player);

        }catch(err) {
            throw err;
        }
    }
}