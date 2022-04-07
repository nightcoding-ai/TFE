import { Injectable, Post, UnauthorizedException } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";
import { PlayerRepository } from "src/players/repository/player/player.repository";
import { Team } from "src/teams/models/teams.entity";
import { DeleteResult } from "typeorm";
import { TeamInvitationDTO } from "../DTO/teamInvitationDTO";
import { TeamInvitationInterface } from "../interfaces/teamInvitation.interface";
import { TeamInvitationRepository } from "../repositories/teamInvitation.repository";




@Injectable()
export class TeamInvitationService {

   constructor(
       private readonly TeamInvitationRepo : TeamInvitationRepository,

       private readonly PlayerRepo : PlayerRepository
   ) {}

   async createOne(idPlayer: number, invitation: any): Promise<TeamInvitationInterface>{
       try{
           const capitaine = await this.PlayerRepo.getOne(idPlayer);
           const invititationsOfPlayer = await this.TeamInvitationRepo.getAllOfOnePlayer(invitation.player);

           if(capitaine.profile.isCaptain === false || !capitaine || !capitaine.team || capitaine.team.players.length >= 5 || capitaine.team.id !== invitation.team || capitaine.team.players.find((player) => player.profile.role === invitation.role)){
                throw new UnauthorizedException();
           }
           if(invititationsOfPlayer.find(invitation => invitation.team.id === capitaine.team.id)){
                throw new UnauthorizedException();
           }

           return await this.TeamInvitationRepo.createNewInvitation(invitation);
       }
       catch(err){
            throw err;
       }

   }

   async acceptedInvitation(playerId: number,idNotif: number): Promise<DeleteResult>{
       try{
            const notif = await this.TeamInvitationRepo.getOne(idNotif);
            const player = await this.PlayerRepo.getOne(playerId);
            const playerFromNotif = await this.PlayerRepo.getOne(notif.player.id);

            if(!player || player.id !== playerFromNotif.id || player.team || notif.team.players.length >= 5 || notif.team.players.find((compo) => compo.profile.role === player.profile.role) || !notif.team){
                throw new UnauthorizedException();
            }
            else{
                player.team = notif.team;
                await this.PlayerRepo.savePlayer(player);
                await this.TeamInvitationRepo.deleteAllOfTeamByPlayerRole(player.profile.role, notif.team.id);
                if(notif.team.players.length >= 4){
                    await this.TeamInvitationRepo.deleteAllOfTeam(notif.team.id);
                }
                return await this.TeamInvitationRepo.deleteAllOfPlayer(notif.player.id);
            }
       }
       catch(err){
            throw err;
       }
   }

   async getAll(): Promise<TeamInvitationInterface[]>{
       try{
            return await this.TeamInvitationRepo.getAll();
       }
       catch(err){
           throw err;
       }
   }

   async getAllOfAPlayer(idPlayer: number): Promise<TeamInvitationInterface[]>{
        try{
                return await this.TeamInvitationRepo.getAllOfOnePlayer(idPlayer);
        }
        catch(err){
            throw err;
        }
   }

   async getAllOfATeam(idPlayer: number): Promise<TeamInvitationInterface[]>{
        try{
            const player = await this.PlayerRepo.getOne(idPlayer);

            return await this.TeamInvitationRepo.getAllOfOneTeam(player.team.id);
        }
        catch(err){
            throw err;
        }
   }

   async deleteAllOfAPlayer(idPlayer:number): Promise<DeleteResult>{
        try{
            return await this.TeamInvitationRepo.deleteAllOfPlayer(idPlayer);
        }
        catch(err){
            throw err;
        }
   }

   async deleteOne(idPlayer: number, idNotif: number): Promise<DeleteResult>{
       try{
            const player = await this.PlayerRepo.getOne(idPlayer);
            if(!player){
                throw new UnauthorizedException();    
            }
            return await this.TeamInvitationRepo.deleteOne(idNotif);

        }
        catch(err){
            throw err;
        }
    }

    @Cron(CronExpression.EVERY_12_HOURS)
    async deleteAllExpiredInvitations(): Promise<DeleteResult>{
        try{
            return await this.TeamInvitationRepo.deleteAllExpiredInvitations();
        }
        catch(err){
            throw err;
        }
    }
}