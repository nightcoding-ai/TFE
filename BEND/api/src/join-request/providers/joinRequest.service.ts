import { Injectable, UnauthorizedException } from "@nestjs/common";
import { join } from "path";
import { PlayerRepository } from "src/players/repository/player/player.repository";
import { Team } from "src/teams/models/teams.entity";
import { TeamRepository } from "src/teams/repository/teams.repository";
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
            console.log(teamToJoin.players.length);

            const allInvOfTeamToJoin = await this.JoinRequestRepository.getAllOfATeam(joinRequest.team);

            if(player.id !== joinRequest.player || player.team || player.profile.isCaptain || !teamToJoin || teamToJoin.players.length >= 5 || allInvOfTeamToJoin){
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

    async getAll(): Promise<JoinRequest[]>{
        try{
            return await this.JoinRequestRepository.getAll();
        }
        catch(err){
            throw err;
        }
    }
}