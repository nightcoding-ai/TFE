import { Injectable, UnauthorizedException } from "@nestjs/common";
import { join } from "path";
import { RoleEnum } from "src/players/enum/role.enum";
import { Player } from "src/players/models/player/player.entity";
import { PlayerRepository } from "src/players/repository/player/player.repository";
import { Team } from "src/teams/models/teams.entity";
import { TeamRepository } from "src/teams/repository/teams.repository";
import { DeleteResult } from "typeorm";
import { CreateJoinRequestDTO } from "../DTO/createJoinRequestDTO";
import { JoinRequest } from "../models/joinRequest.entity";
import { JoinRequestRepository } from "../repositories/joinRequest.repository";










@Injectable()
export class JoinRequestService {

    constructor(
        private readonly JoinRequestRepository: JoinRequestRepository,
        private readonly PlayerRepository: PlayerRepository,
        private readonly TeamRepository: TeamRepository
        ) {}

    async createOne(idPlayer: number, joinRequest: any): Promise<JoinRequest>{
        try{
            const player = await this.PlayerRepository.getOne(idPlayer);
            const teamToJoin = await this.TeamRepository.getTeam(joinRequest.team);



            if(player.id !== joinRequest.player || player.team || player.profile.isCaptain || !teamToJoin || teamToJoin.players.length > 4 || teamToJoin.players.find((player) => player.profile.role === player.profile.role)){
                throw new UnauthorizedException();
            }
            else {
                return await this.JoinRequestRepository.createOne(joinRequest);

            }
        }
        catch(err){
            throw err;
        }

    }

    async acceptRequest(idCaptain: number, idRequest: number): Promise<any>{
        try{
            const captain = await this.PlayerRepository.getOne(idCaptain);
            const request = await this.JoinRequestRepository.getOne(idRequest);
            const team = captain.team;
            const playerAsker = await this.PlayerRepository.getOne(request.player.id);

            if(!captain || !captain.team || !captain.profile.isCaptain || playerAsker.team || team.players.length > 4){
                throw new UnauthorizedException();
            }
            playerAsker.team = team;
            await this.PlayerRepository.savePlayer(playerAsker);

            if(team.players.length === 4){
                console.log("SI TEAM.LENGTH === 4 \n",playerAsker.team);
                return await this.JoinRequestRepository.deleteAllOfATeam(team.id);
            }
            else{
                console.log("SI TEAM.LENGTH > 4 \n",playerAsker.team.players.length);
                return await this.JoinRequestRepository.deleteAllOfATeamByRole(playerAsker.profile.role, captain.team);
            }


            
            
        }
        catch(err){
            throw err;
        }
    }
    
    

    async getAll(): Promise<JoinRequest[]>{
        try{
            return await this.JoinRequestRepository.getAll();
        }
        catch(err){
            throw err;
        }
    }


    async getAllOfAPlayer(idPlayer: number): Promise<JoinRequest[]>{
        try{
            return await this.JoinRequestRepository.getAllOfAPlayer(idPlayer);
        }
        catch(err){
            throw err;
        }
    }

    async getAllOfTeam(idCaptain: number, idTeam: number): Promise<JoinRequest[]>{
        try{
            const captain = await this.PlayerRepository.getOne(idCaptain);

            if(!captain || !captain.profile.isCaptain || !captain.team || captain.team.id !== idTeam){
                throw new UnauthorizedException("This request can't be reached, possible reasons : Player does not exist, Player is not a team captain, Player's team does not match with team request.");
            }
            return await this.JoinRequestRepository.getAllOfATeam(idTeam);
        }
        catch(err){
            throw err;
        }
    }

    async deleteOne(idJoinRequest: number): Promise<DeleteResult>{
        try{
            return await this.JoinRequestRepository.deleteOne(idJoinRequest);
        }
        catch(err){
            throw err;
        }
    }

    async deleteAllOfAPlayer(idPlayer: number): Promise<DeleteResult>{
        try{
            return await this.JoinRequestRepository.deleteAllOfAPlayer(idPlayer);
        }
        catch(err){
            throw err;
        }
    }

    async deleteAllOfATeam(idTeam: number): Promise<DeleteResult>{
        try{
            return await this.JoinRequestRepository.deleteAllOfATeam(idTeam);
        }
        catch(err){
            throw err;
        }
    }

    async deleteAllOfATeamByRole(role: RoleEnum, team: Team): Promise<DeleteResult>{
        try{
            return await this.JoinRequestRepository.deleteAllOfATeamByRole(role, team);
        }
        catch(err){
            throw err;
        }
    }
}