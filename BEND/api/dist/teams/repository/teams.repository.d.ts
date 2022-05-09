import { Team } from "../models/teams.entity";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { TeamDTO } from "../DTO/teamDTO";
import { CreateTeamDTO } from "../DTO/createTeamDTO";
export declare class TeamRepository extends Repository<Team> {
    addTeam(teamDTO: CreateTeamDTO): Promise<Team>;
    getAll(): Promise<Team[]>;
    getAllWithLogos(): Promise<Team[]>;
    getNumberOfTeams(): Promise<number>;
    getAllFullTeams(): Promise<Team[]>;
    getAllNotFullTeams(): Promise<Team[]>;
    getTeamsWithPrecisedNumberOfPlayers(nbr: number): Promise<Team[]>;
    getTeamsWithPrecisedFreePlaces(nbr: number): Promise<Team[]>;
    getTeam(idTeam: number): Promise<Team>;
    updateTeam(idTeam: number, teamDTO: TeamDTO): Promise<UpdateResult>;
    deleteTeam(idTeam: number): Promise<DeleteResult>;
}
