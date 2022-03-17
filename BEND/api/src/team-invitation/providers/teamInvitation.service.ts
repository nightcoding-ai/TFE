import { Injectable, Post, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PlayerRepository } from "src/players/repository/player/player.repository";
import { Team } from "src/teams/models/teams.entity";
import { TeamInvitationDTO } from "../DTO/teamInvitationDTO";
import { TeamInvitation } from "../models/teamInvitation";
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

           console.log(capitaine);

           const invititationsOfPlayer = await this.TeamInvitationRepo.getAllOfOnePlayer(invitation.player);

           if(capitaine.profile.isCaptain === false || !capitaine || !capitaine.team || capitaine.team.players.length >= 5 || capitaine.team.id !== invitation.team){

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