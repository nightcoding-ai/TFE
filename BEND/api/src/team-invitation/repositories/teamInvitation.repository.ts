import { PlayersController } from "src/players/controllers/player/player.controller";
import { PlayerDTO } from "src/players/DTO/player/playerDTO";
import { RoleEnum } from "src/players/enum/role.enum";
import { Player } from "src/players/models/player/player.entity";
import { TeamDTO } from "src/teams/DTO/teamDTO";
import { Team } from "src/teams/models/teams.entity";
import { getRepository, Repository } from "typeorm";
import { TeamInvitationDTO } from "../DTO/teamInvitationDTO";
import { TeamInvitation } from "../models/teamInvitation.entity";



export class TeamInvitationRepository extends Repository<TeamInvitation>{

    async createNewInvitation(newInvitation: any){
        
        const teamInvRepo = getRepository(TeamInvitation);


        return await teamInvRepo.save(newInvitation);

    }

    async getAll(){

        const teamInvRepo = getRepository(TeamInvitation);

        const invitations = await teamInvRepo.find();


        return invitations;
    }

    async getOneOfOnePlayer(idPlayer: number){

        const teamInvRepo = getRepository(TeamInvitation);

        const invitationOfPlayer = await teamInvRepo.findOne({ where: {
            player: {
                id: idPlayer
            }
        }})

        return invitationOfPlayer;
    }

    async getAllOfOnePlayer(idPlayer: number){

        const teamInvRepo = getRepository(TeamInvitation);


        const allInvitationsOfPlayer = await teamInvRepo.find({ where: {
            player: {
                id: idPlayer
            }
        }})

        return allInvitationsOfPlayer;

    }

    async getAllOfOneTeam(idTeam: number){

        const teamInvRepo = getRepository(TeamInvitation);


        const allInvitationsOfTeam = await teamInvRepo.find({ where: {
            team: {
                id: idTeam
            }
        }})

        return allInvitationsOfTeam;
    }

    async deleteAllOfPlayer(idPlayer: number){

        const teamInvRepo = getRepository(TeamInvitation);


        const allInvitationsOfPlayerRemoved = await teamInvRepo.delete({player: {
                id: idPlayer
        }})

       return allInvitationsOfPlayerRemoved;


    }

    async deleteAllOfTeam(idTeam: number){

        const teamInvRepo = getRepository(TeamInvitation);


        const allInvitationsOfTeamRemoved = await teamInvRepo.delete({team: {
                id: idTeam
        }})

       return allInvitationsOfTeamRemoved;


    }

    async deleteAllOfTeamByPlayerRole(roleToDelete: RoleEnum, idTeam: number){
        
        const teamInvRepo = getRepository(TeamInvitation);

  
        const allInvOfTeamByRole: any  = await teamInvRepo.find({ where:
            {role: roleToDelete,
            team: {id: idTeam}}
            });
            


        return await teamInvRepo.delete(allInvOfTeamByRole);

        


    }

    async deleteOne(idNotif: number){

        const teamInvRepo = getRepository(TeamInvitation);

        return await teamInvRepo.delete(idNotif);
        
    }

    async getOne(idNotif: number){

        const teamInvRepo = getRepository(TeamInvitation);

        return await teamInvRepo.findOne(idNotif);
        
    }
}