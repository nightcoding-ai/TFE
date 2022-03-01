import { Team } from "../models/teams.entity";
import { getConnection, getRepository, Repository } from "typeorm";
import { TeamInterface } from "../models/teams.interface";


export class TeamRepository extends Repository<Team>{



    async getTeamsWithPlayers(){

        const teamRepo = getRepository(Team);
    
        const teamWithPlayers =  await teamRepo.find({

            relations: ["players", "players.playerInfo"]
            
        })
    
         return teamWithPlayers;
    }
    
    async getTeamByID(idTeam: number){
    
        const teamRepo = getRepository(Team);
    
        const team =  await teamRepo.findOne({
           relations: ["players", "players.playerInfo"],
           where: { id: idTeam}
        })
    
        
        return team;
    }

    async updateTeam(idTeam: number, team: Team){

        const teamModified = await getConnection()
                                .createQueryBuilder()
                                .update(Team)
                                .set(team)
                                .where("id = :id", { id: idTeam})
                                .execute();

        return teamModified;
    }

    async deleteTeam(idTeam: number){
        
        
        const teamRepo = getRepository(Team);

        const teamDeleted = teamRepo.delete(idTeam);

        return teamDeleted;
    }

}


