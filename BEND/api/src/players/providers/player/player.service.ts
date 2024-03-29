import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, UpdateResult } from 'typeorm';
import { TournamentMatch } from '../../../tournaments/models/tournamentMatch.entity';
import { TournamentRepository } from '../../../tournaments/repositories/tournament.repository';
import { TournamentMatchRepository } from '../../../tournaments/repositories/tournamentMatch.repositoy';
import { TournamentParticipationRepository } from '../../../tournaments/repositories/tournamentParticipation.repository';
import { CreatePlayerDTO } from '../../DTO/player/createPlayerDTO';
import { FreePlayerDTO } from '../../DTO/player/freePlayerDTO';
import { PlayerDTO } from '../../DTO/player/playerDTO';
import { PlayerProfileDTO } from '../../DTO/player/playerProfileDTO';
import { UpdatePlayerDTO } from '../../DTO/player/updatePlayerDTO';
import { UpdatePlayerProfileDTO } from '../../DTO/player/updatePlayerProfileDTO';
import { ProfileDTO } from '../../DTO/profil/profileDTO';
import { RoleEnum } from '../../enum/role.enum';
import { UserType } from '../../enum/userType.enum';
import { Player } from '../../models/player/player.entity';
import { PlayerRepository } from '../../repository/player/player.repository';
import { ProfileRepository } from '../../repository/profil/profile.repository';
const argon2 = import('argon2');

@Injectable()
export class PlayersService {

    constructor(
        private readonly PlayerRepo : PlayerRepository,
        private readonly ProfileRepo : ProfileRepository,
        private readonly TournamentMatchRepo : TournamentMatchRepository,
        private readonly TournamentParticipationRepo : TournamentParticipationRepository,
        private readonly TournamentRepo : TournamentRepository
    ){ }

    /**
     * Permet la création d'un nouveau joueur.
     * @param {CreatePlayerDTO} newPlayer - L'objet représentant un nouveau joueur.
     * @returns {Player} le résultat après la création du joueur dans la base de données.
     */
    async createAPlayer(newPlayer: CreatePlayerDTO): Promise<Player> {
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
     * @returns {DeleteResult | UnauthorizedException} le résultat après la suppresion du joueur de la base de données.
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
            let player: PlayerDTO = new PlayerDTO();
            player.id = result.id;
            player.userType = result.userType;
            player.name = result.name;
            player.discord = result.profile.discord;
            player.profilPicture = result.profile.profilPicture;
            player.role = result.profile.role;
            player.rank = result.profile.rank;
            player.ign = result.profile.inGameName;
            player.isCaptain = result.profile.isCaptain;
            if(result.team) {
                player.teamId = result.team.id;
                player.teamName = result.team.name;
            }
            return player;
        }
        catch(err) {
            throw err;
        }
    }

    async myProfile(idPlayer: number): Promise<PlayerProfileDTO | undefined> {
        try {
            const result = await this.PlayerRepo.getOne(idPlayer);
            if(!result) {
                return undefined;
            }
            const dto: PlayerProfileDTO = new PlayerProfileDTO();
            dto.id = result.id;
            dto.idProfile = result.profile.id;
            dto.name = result.name;
            dto.profilPicture = result.profile.profilPicture;
            dto.mail = result.profile.email;
            dto.discord = result.profile.discord;
            dto.ign = result.profile.inGameName;
            dto.role = result.profile.role;
            dto.rank = result.profile.rank;
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
    async getAllPlayers(): Promise<PlayerDTO[] | undefined> {
        try {
            const dtoArray: PlayerDTO[] = [];
            const result = await this.PlayerRepo.getAll();
            if(result) {
                for (const item of result) {
                    const dto = new PlayerDTO();
                    dto.id = item.id;
                    dto.name = item.name;
                    dto.discord = item.profile.discord;
                    dto.ign = item.profile.inGameName;
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
    async getAllByRoleAndFree(roleOfPlayer: RoleEnum): Promise<PlayerDTO[] | undefined> {
        try {
            const result = await this.PlayerRepo.getAllByRoleAndFree(roleOfPlayer);
            if(!result) {
                return undefined;
            }
            const dtoArray: PlayerDTO[] = [];
            for (const player of result) {
                let dto: PlayerDTO = new PlayerDTO();
                dto.id = player.id;
                dto.name = player.name;
                dto.discord = player.profile.discord;
                dto.ign = player.profile.inGameName;
                if(player.profile.profilPicture) {
                    dto.profilPicture = player.profile.profilPicture;
                }
                dto.role = player.profile.role;
                dto.rank = player.profile.rank;
                dtoArray.push(dto);
            }
            return dtoArray;
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
     * @returns {UpdateResult | UnauthorizedException}  le résultat après la modification ou une erreur 401.
     */
    async updatePlayerProfile(idAsker: number, idPlayer: number, updatePlayerProfileDTO: UpdatePlayerProfileDTO): Promise<UpdateResult | UnauthorizedException> {
        try {  
            const asker = await this.PlayerRepo.getOne(idAsker);
            if(asker.id !== +idPlayer) {
                return new UnauthorizedException();
            }
            await this.ProfileRepo.updateProfile(asker.profile.id, updatePlayerProfileDTO);
        }
        catch(err) {
            throw err;
        }
    }

    async updatePlayer(idAsker: number, idPlayer: number, updatePlayerDTO: UpdatePlayerDTO): Promise<UpdateResult | UnauthorizedException> {
        try {  
            const asker = await this.PlayerRepo.getOne(idAsker);
            if(asker.id !== +idPlayer) {
                return new UnauthorizedException();
            }
            await this.PlayerRepo.updatePlayer(asker.id, updatePlayerDTO);
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
            const allMatchesOfTeam = await this.TournamentMatchRepo.getAllMatchesOfATeam(player.team.id);
            const allTournamentsOfTeam = await this.TournamentParticipationRepo.getAllOfATeam(player.team.id);
            if(!player || !player.team){
                throw new UnauthorizedException();
            }
            if(player.profile.isCaptain){
                player.team = null;
                player.profile.isCaptain = false;
                await this.PlayerRepo.savePlayer(player);
            }
            if(player.team.players.length === 5 && allMatchesOfTeam) {
                for (const match of allMatchesOfTeam) {
                    if(match.teamA.id === player.team.id) {
                        match.teamAWins = 0;
                        match.teamBWins = match.bestOfType;
                        match.winner = match.teamB;
                        match.isOver = true;
                    }
                    if(match.teamB.id === player.team.id) {
                        match.teamBWins = 0;
                        match.teamAWins = match.bestOfType;
                        match.winner = match.teamA;
                        match.isOver = true;
                    }
                    await this.TournamentMatchRepo.saveOne(match);
                    for (const participation of allTournamentsOfTeam) {
                        let tournament = await this.TournamentRepo.getOneWithMatches(participation.tournament.id);
                        let nextMatchForWinner: TournamentMatch = tournament.matches.find(nm => nm.round === match.round + 1 && nm.order === Math.ceil(match.order/2));
                        if(nextMatchForWinner.teamA === null && nextMatchForWinner.teamB === null) {
                            nextMatchForWinner.teamA = match.winner;
                            await this.TournamentMatchRepo.saveOne(nextMatchForWinner);
                        }
                        if(nextMatchForWinner.teamA !== null && nextMatchForWinner.teamB === null && nextMatchForWinner.teamA !== match.winner) {
                            nextMatchForWinner.teamB = match.winner;
                            await this.TournamentMatchRepo.saveOne(nextMatchForWinner);
                        }  
                    }
                }
                
            }
            player.team = null;
            return await this.PlayerRepo.savePlayer(player);
        }
        catch(err) {
            throw err;
        }
    }

    /**
     * 
     * @param playerId 
     * @returns 
     */
    async deleteProfilePicture(playerId: number): Promise<DeleteResult | null> {
        try {
            const player = await this.PlayerRepo.getOne(playerId);
            if(!player.profile.profilPicture) {
                return null;
            }
        }
        catch(err) {
            throw err;
        }
    }
}