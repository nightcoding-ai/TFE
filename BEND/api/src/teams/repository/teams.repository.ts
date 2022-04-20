import { Team } from "../models/teams.entity";
import { DeleteResult, Equal, getConnection, getRepository, LessThan, Not, Repository, UpdateResult } from "typeorm";
import { TeamDTO } from "../DTO/teamDTO";
import { Player } from "src/players/models/player/player.entity";
import { TeamInterface } from "../interfaces/teams.interface";
import { CreateTeamDTO } from "../DTO/createTeamDTO";


export class TeamRepository extends Repository<Team> {

    async addTeam(teamDTO: CreateTeamDTO): Promise<TeamInterface> {
        const teamRepo = getRepository(Team);
        return await teamRepo.save(teamDTO);
    }
    
    async getAll(): Promise<TeamInterface[]> {
        const teamRepo = getRepository(Team);
        return await teamRepo.find({
            withDeleted: true,
            select: ["id", "name", "abbreviation"]
        });
    }

    async getAllWithLogos(): Promise<TeamInterface[]> {
        const teamRepo = getRepository(Team);
        return await teamRepo.find({
            select: ["id", "name", "logo"],
            order: {
                name: "ASC"
            }
        });
    }

    async getNumberOfTeams(): Promise<number> {
        const teamRepo = getRepository(Team);
        return await teamRepo.count();
    }

    async getAllFullTeams(): Promise<TeamInterface[]> {
        const teamRepo = getRepository(Team);
        const teams = await teamRepo.find({ select: ["id", "name"]});
        const fullTeams : TeamInterface[] = [];
        for (const team of teams) {
            if(team.players.length === 5){
                fullTeams.push(team);
            }
        }
        return fullTeams;
    }

    async getAllNotFullTeams(): Promise<TeamInterface[]> {
        const teamRepo = getRepository(Team);
        
        const teams = await teamRepo.find({ select: ["id", "name"]});
        const notFullTeams : TeamInterface[] = [];
        for (const team of teams) {
            if(team.players.length < 5){
                notFullTeams.push(team);
            }
        }
        return notFullTeams;
    }

    async getTeamsWithPrecisedNumberOfPlayers(nbr: number): Promise<TeamInterface[]> {
        const teamRepo = getRepository(Team);
        const teams = await teamRepo.find({ 
            select: ["id", "name"]
        });
        const notFullTeams : TeamInterface[] = [];
        for (const team of teams) {
            if(team.players.length === nbr){
                notFullTeams.push(team);
            }
        }
        return notFullTeams;
    }

    async getTeamsWithPrecisedFreePlaces(nbr: number): Promise<TeamInterface[]> {
        const teamRepo = getRepository(Team);
        const teams = await teamRepo.find({ 
            select: ["id", "name"]
        });
        const teamsWithFreePlaces : TeamInterface[] = [];
        for (const team of teams) {
            if(team.players.length === (5-nbr)){
                teamsWithFreePlaces.push(team);
            }
        }
        return teamsWithFreePlaces;
    }

    async getTeam(idTeam: number): Promise<Team> {
        const teamRepo = getRepository(Team);

        return await teamRepo.findOne(idTeam, {
            relations: ["players"]
        });
    }

    async updateTeam(idTeam: number, teamDTO: TeamDTO): Promise<UpdateResult> {
        const teamRepo = getRepository(Team);
        return await teamRepo.update(idTeam, teamDTO);        
    }

    async deleteTeam(idTeam: number): Promise<DeleteResult> {
        const teamRepo = getRepository(Team);
        const playerRepo = getRepository(Player);
        const teamToDeleted = await teamRepo.findOne(idTeam);
        for (const player of teamToDeleted.players) {
            player.team = null;
            await playerRepo.save(player);  
        }
        return await teamRepo.softDelete(idTeam);
    }
}


