import { PlayerDTO } from "src/players/DTO/player/playerDTO";
import { Player } from "src/players/models/player/player.entity";
import { TeamDTO } from "src/teams/DTO/teamDTO";
import { Team } from "src/teams/models/teams.entity";
import { getRepository, Repository } from "typeorm";
import { TeamInvitationDTO } from "../DTO/teamInvitationDTO";
import { TeamInvitation } from "../models/teamInvitation";



export class TeamInvitationRepository extends Repository<TeamInvitation>{

    async createNewInvitation(newInvitation: any){
        
        const teamInvRepo = getRepository(TeamInvitation);


        return await teamInvRepo.save(newInvitation);

    }

    async getAll(){

        const teamInvRepo = getRepository(TeamInvitation);

        const invitations = await teamInvRepo.find();

        console.log("Toutes les invitations ",invitations);

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

        console.log("RAS",allInvitationsOfTeam);

        return allInvitationsOfTeam;
    }

    async deleteOne(idNotif: number){

        const teamInvRepo = getRepository(TeamInvitation);

        return await teamInvRepo.delete(idNotif);
        
    }
}