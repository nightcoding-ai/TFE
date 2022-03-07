import { Team } from "../models/teams.entity";
import { DeleteResult, getConnection, getRepository, Repository, UpdateResult } from "typeorm";
import { TeamDTO } from "../DTO/teamDTO";


export class TeamRepository extends Repository<Team>{

    async addTeam(teamDTO: TeamDTO): Promise<void> {

        const teamRepo = getRepository(Team);

        await teamRepo.save(teamDTO);
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

        const deleted = await teamRepo.delete(idTeam);

        return deleted;

    }
    
}


