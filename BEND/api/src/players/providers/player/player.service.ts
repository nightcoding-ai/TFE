import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { error } from 'console';
import { type } from 'os';
import { CreatePlayerDTO } from 'src/players/DTO/player/CreatePlayerDTO';
import { PlayerDTO } from 'src/players/DTO/player/playerDTO';
import { ProfileDTO } from 'src/players/DTO/profil/profileDTO';
import { RoleEnum } from 'src/players/enum/role.enum';
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


    async create(playerDTO: CreatePlayerDTO): Promise<void> {

        try {


            const hash =  await (await argon2).hash(playerDTO.profile.password);


            playerDTO.profile.password = hash;


             await this.PlayerRepo.addPlayer(playerDTO);
            
        }
        catch(err){

            throw err;
        }

        

        
    }

    async delete(idPlayer: number): Promise<DeleteResult> {

        return await this.PlayerRepo.delPlayer(idPlayer);
    }

    async getOne(idPlayer: number): Promise<PlayerDTO  | undefined> {
        return await this.PlayerRepo.getOne(idPlayer);
    }

    async getOneByName(playerName: string): Promise<Player> {
        return await this.PlayerRepo.getOneByName(playerName);
    }

    async getAll(): Promise<PlayerDTO[]> {
        return await this.PlayerRepo.getAll();
    }

    async getAllByRole(roleOfPlayer: RoleEnum): Promise<PlayerDTO[]> {
        return await this.PlayerRepo.getAllByRole(roleOfPlayer);
    }
    


    async update(idPlayer: number, playerDTO: PlayerDTO ) {
        return await this.PlayerRepo.updatePlayer(idPlayer, playerDTO);
    }

    async updateProfile(idProfile: number, profileDTO: ProfileDTO) {
        return await this.ProfileRepo.updateProfile(idProfile, profileDTO);
    }

    async leaveTeam(idPlayer: number) {
        try {

            const player = await this.PlayerRepo.getOne(idPlayer);

            if(!player || player.team === null || player.team === undefined){
                return new UnauthorizedException();
            }

            if(player.profile.isCaptain === true){
                player.team = null;
                player.profile.isCaptain = false;
                await this.PlayerRepo.savePlayer(player);
            }
            player.team = null;
            await this.PlayerRepo.savePlayer(player);

        }catch(err) {

            throw err;
        }
    }
}