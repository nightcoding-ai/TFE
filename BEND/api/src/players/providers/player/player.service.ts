import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreatePlayerDTO } from 'src/players/DTO/player/CreatePlayerDTO';
import { PlayerDTO } from 'src/players/DTO/player/playerDTO';
import { ProfileDTO } from 'src/players/DTO/profil/profileDTO';
import { Player } from 'src/players/models/player/player.entity';
import { PlayerRepository } from 'src/players/repository/player/player.repository';
import { ProfileRepository } from 'src/players/repository/profil/profile.repository';
import { DeleteResult, UpdateResult } from 'typeorm';
import { FreePlayerDTO } from '../../DTO/player/freePlayerDTO';
import { RoleEnum } from '../../enum/role.enum';
import { UserType } from '../../enum/userType.enum';
const argon2 = import('argon2');

@Injectable()
export class PlayersService {

    constructor(
        private readonly PlayerRepo : PlayerRepository,
        private readonly ProfileRepo : ProfileRepository
    ){ }

    /**
     * Permet la création d'un nouveau
     * @param {CreatePlayerDTO} newPlayer - L'objet représentant un nouveau joueur.
     * @returns {Player} le résultat après la création du joueur dans la base de données.
     */
    async create(newPlayer: CreatePlayerDTO): Promise<Player> {
        try {
            const hash =  await (await argon2).hash(newPlayer.profile.password);
            newPlayer.profile.password = hash;
            return await this.PlayerRepo.addPlayer(newPlayer);      
        }
        catch(err) {
            throw err;
        }
    }

    /**
     * Supprimer un joueur de la base de donnée en tant qu'administrateur.
     * @param {number} adminId - l'id du joueur administrateur afin de vérifier si celui-ci a bien le rôle.
     * @param {number} idPlayer - l'id du joueur à supprimer.
     * @returns {DeleteResult | UnauthorizedException}le résultat après la suppresion du joueur de la base de données.
     */
    async delete(adminId: number,idPlayer: number): Promise<DeleteResult | UnauthorizedException> {
        try {
            return this.PlayerRepo.isAdmin(adminId) ? this.PlayerRepo.deleteOne(idPlayer): new UnauthorizedException();  
        }
        catch(err) {
            throw err;
        }
    }

    /**
     * Trouver un joueur dans la base de données sur base de l'id unique du joueur.
     * @param {number} idPlayer - L'id du joueur à trouver dans la base de donnée.
     * @returns {PlayerDTO | undefined} le résultat après avoir trouvé le joueur ou renvoie {undefined} si aucun joueur n'a été trouvé.
     */
    async getOne(idPlayer: number): Promise<PlayerDTO  | undefined> {
        try {
            const result = await this.PlayerRepo.getOne(idPlayer);
            if(!result) { 
                return undefined;
            }
            let dto = new PlayerDTO();
            dto.id = result.id;
            dto.name = result.name;
            dto.discord = result.profile.discord;
            dto.role = result.profile.role;
            dto.rank = result.profile.rank;
            if(result.team){
                dto.teamName = result.team.name;
            }
            return dto;
        }
        catch(err) {
            throw err;
        }
    }

    /**
     * Trouver un joueur dans la base de données sur base de son nom unique.
     * @param {string} playerName - Le nom du joueur à trouver dans la base de données.
     * @returns {Player | undefined} le résultat après avoir trouvé le joueur ou renvoie {undefined} si aucun joueur n'a été trouvé.
     */
    async getOneByName(playerName: string): Promise<Player | undefined> {
        try {
            return await this.PlayerRepo.getOneByName(playerName);
        }
        catch(err) {
            throw err;
        }
    }

    /**
     * Trouver tous les joueurs qui existent dans la base de données.
     * @returns {PlayerDTO[] | undefined} le résultat après avoir trouvé tous les joueurs de la base de données ou renvoie {undefined} si aucun joueur n'existe.
     */
    async getAll(): Promise<PlayerDTO[] | undefined> {
        try {
            const dtoArray: PlayerDTO[] = [];
            const result = await this.PlayerRepo.getAll();
            if(result) {
                for (const item of result) {
                    const dto = new PlayerDTO();
                    dto.id = item.id;
                    dto.name = item.name;
                    dto.discord = item.profile.discord;
                    dto.role = item.profile.role;
                    dto.rank = item.profile.rank;
                    if(item.team) {
                        dto.teamName = item.team.name;
                    }
                dtoArray.push(dto);
                }
                return dtoArray;
            }
            return null;
        }
        catch(err) {
            throw err;
        }
    }

    /**
     * Trouve tous les joueurs qui existent n'ayant aucune équipe.
     * @returns {FreePlayerDTO[] | undefined} le résutlat après avoir trouvé tous les joueurs de la base de données qui n'ont pas d'équipe, sinon {undefined} si aucun joueur est libre.
     */
    async getAllFree(): Promise<FreePlayerDTO[] | undefined> {
        const dtoArray: FreePlayerDTO[] = [];
        const result = await this.PlayerRepo.getAllFree();
        if(result) {
            for (const item of result) {
                const dto = new PlayerDTO();
                dto.id = item.id;
                dto.name = item.name;
                dto.discord = item.profile.discord;
                dto.role = item.profile.role;
                dto.rank = item.profile.rank;
                dtoArray.push(dto);
            }
            return dtoArray;
        }
        return null;
    }

    /**
     * Trouve tous les joueurs qui existent n'ayant aucune équie pour un ROLE PRECIS.
     * @param {RoleEnum} roleOfPlayer -  le rôle sur lequel doit se baser la recherche des joueurs n'ayant pas d'équipe
     * @returns le résultat après avoir trouvé les joueurs étant libres et qui ont le rôle recherché sinon {undefined} si aucun joueur est libre.
     */
    async getAllByRoleAndFree(roleOfPlayer: RoleEnum): Promise<Player[] | undefined> {
        try {
            return await this.PlayerRepo.getAllByRoleAndFree(roleOfPlayer);
        }
        catch(err) {
            throw err;
        }
    }

    /**
     * Savoir le nombre de joueurs total dans la base de donnée.
     * @returns {number} le nombre de joueurs dans la base de données sinon {null} si aucun joueur dans la base de données.
     */
    async getNumberOfPlayer(): Promise<number | null> {
        try{
            return await this.PlayerRepo.getNumberOfPlayers();
        }
        catch(err) {
            throw err;
        }
    }
    
    /**
     * Modifier le nom d'un joueur.
     * @param {number} idAsker - l'id du joueur qui souhaite modifier le nom, afin de vérifier si c'est bien son propre nom, ou si il est administrateur.
     * @param {number} idPlayer - l'id du joueur dont il faut modifier le nom.
     * @param {PlayerDTO} playerDTO - le nouveau nom du joueur.
     * @returns {UpdateResult | UnauthorizedException}  le résultat après la modification
     */
    async patchPlayer(idAsker: number, idPlayer: number, playerDTO: PlayerDTO ): Promise<UpdateResult | UnauthorizedException> {
        try {  
            const asker = await this.PlayerRepo.getOne(idAsker);
            if(playerDTO.userType && asker.userType !== UserType.ADMIN) {
                throw new UnauthorizedException();
            }
            return asker.userType === UserType.ADMIN || asker.id === idPlayer ? await this.PlayerRepo.updatePlayer(idPlayer, playerDTO) : new UnauthorizedException();
        }
        catch(err) {
            throw err;
        }
    }

    /**
     * Modifier le profil d'un joueur.
     * @param {number} idAsker - l'id du joueur qui souhaite modifier le profil, afin de vérifier si c'est bien son propre profil, ou si il est administrateur.
     * @param {number} idAsker - l'id du joueur dont il faut modifier le profil.
     * @param {number} idProfile - l'id du profil qui doit être modifié.
     * @param {ProfileDTO} profileDTO - Le nouveau profil.
     * @returns {UpdateResult | UnauthorizedException}
     */
    async updateProfile(idAsker: number, idProfile: number, profileDTO: ProfileDTO): Promise<UpdateResult | UnauthorizedException> {
        try {
            const asker = await this.PlayerRepo.getOne(idAsker);
            return asker.userType === UserType.ADMIN || asker.profile.id === idProfile ? await this.ProfileRepo.updateProfile(idProfile, profileDTO) : new UnauthorizedException();
        }
        catch(err) {
            throw err;
        }
    }

    /**
     * Quitter une équipe, qui prend en compte si le joueur est capitaine ou non.
     * @param {number} idPlayer - l'id du joueur qui souhaite quitter son équipe.
     * @returns {Player} le joueur qui a quitté son équipe.
     */
    async leaveTeam(idPlayer: number): Promise<Player> {
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
        }
        catch(err) {
            throw err;
        }
    }
}