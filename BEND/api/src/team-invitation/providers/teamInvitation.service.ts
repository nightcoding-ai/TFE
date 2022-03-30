import { Injectable, Post, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PlayerRepository } from "src/players/repository/player/player.repository";
import { Team } from "src/teams/models/teams.entity";
import { TeamInvitationDTO } from "../DTO/teamInvitationDTO";
import { TeamInvitationRepository } from "../repositories/teamInvitation.repository";




@Injectable()
export class TeamInvitationService {

   constructor(
       private readonly TeamInvitationRepo : TeamInvitationRepository,

       private readonly PlayerRepo : PlayerRepository
   ) {}

   async createOne(idPlayer: number, invitation: any){
       try{

           const capitaine = await this.PlayerRepo.getOne(idPlayer);


           const invititationsOfPlayer = await this.TeamInvitationRepo.getAllOfOnePlayer(invitation.player);

           const playerToInvite = await this.PlayerRepo.getOne(invitation.player);

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

   async acceptedInvitation(playerId: number,idNotif: number){
       try{

            const notif = await this.TeamInvitationRepo.getOne(idNotif);
            const player = await this.PlayerRepo.getOne(playerId);
            const playerFromNotif = await this.PlayerRepo.getOne(notif.player.id);


            if(!player || player.id !== playerFromNotif.id || player.team || notif.team.players.length >= 5 || notif.team.players.find((compo) => compo.profile.role === player.profile.role) || !notif.team){
                throw new UnauthorizedException();
            }
            else{

                player.team = notif.team;
                console.log(player);
                await this.PlayerRepo.savePlayer(player);
                await this.TeamInvitationRepo.deleteAllOfTeamByPlayerRole(player.profile.role, notif.team.id);
                await this.TeamInvitationRepo.deleteAllOfPlayer(notif.player.id);

                
            }

       }
       catch(err){

            throw err;
       }
   }

   async getAll(){
       try{

            const invitations = await this.TeamInvitationRepo.getAll();

            return invitations;
       }
       catch(err){
           throw err;
       }
   }

   async getAllOfAPlayer(idPlayer: number){
       try{

            const invitations = await this.TeamInvitationRepo.getAllOfOnePlayer(idPlayer);

            return invitations;
       }
       catch(err){

            throw err;
        }

   }

   async getAllOfATeam(idPlayer: number){
    try{

        const player = await this.PlayerRepo.getOne(idPlayer);


        const invitations = await this.TeamInvitationRepo.getAllOfOneTeam(player.team.id);

        return invitations;
   }
   catch(err){

        throw err;
    }
   }

   async deleteAllOfAPlayer(idPlayer:number){
    try{

        const invitations = await this.TeamInvitationRepo.deleteAllOfPlayer(idPlayer);

        return invitations;
   }
   catch(err){

        throw err;
    }

   }

   async deleteAllOfATeam(idTeam: number){
    try{

    }
    catch(err){
        throw err;

    }
   }
   async deleteOne(idPlayer: number, idNotif: number){
       try{

            const player = await this.PlayerRepo.getOne(idPlayer);

            if(!player){
                return new UnauthorizedException();    
            }

            return await this.TeamInvitationRepo.deleteOne(idNotif);

        }
        catch(err){

            throw err;
        }

    }
}