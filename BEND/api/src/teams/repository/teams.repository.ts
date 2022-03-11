import { Team } from "../models/teams.entity";
import { DeleteResult, getConnection, getRepository, Repository, UpdateResult } from "typeorm";
import { TeamDTO } from "../DTO/teamDTO";
import { Player } from "src/players/models/player/player.entity";


export class TeamRepository extends Repository<Team>{

    async addTeam(teamDTO: TeamDTO): Promise<Team> {

        const teamRepo = getRepository(Team);

        return  await teamRepo.save(teamDTO);

        
    }
    

    async getAll(): Promise<TeamDTO[]> {

        const teamRepo = getRepository(Team);

        const teams = await teamRepo.find();

        return teams;
    }

    async getTeam(idTeam: number): Promise<TeamDTO> {

        const teamRepo = getRepository(Team);

        const team = await teamRepo.findOne(idTeam);

        return team;
    }

    async updateTeam(idTeam: number, teamDTO: TeamDTO): Promise<UpdateResult> {

        const teamRepo = getRepository(Team);

        const modify = await teamRepo.update(idTeam, teamDTO);

        return modify;
        
    }

    async deleteTeam(idTeam: number): Promise<DeleteResult> {

        const teamRepo = getRepository(Team);
        const playerRepo = getRepository(Player);


        const teamToDeleted = await teamRepo.findOne(idTeam);

        for (const player of teamToDeleted.players) {
            player.team = null;

            await playerRepo.save(player);
            
        }

        const deleted = await teamRepo.delete(idTeam);

        return deleted;

    }
    
}


