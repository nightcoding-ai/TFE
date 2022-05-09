import { DeleteResult, UpdateResult } from "typeorm";
import { Player } from "../../players/models/player/player.entity";
import { FullTeamDTO } from "../DTO/fullTeamDTO";
import { NotFullTeamDTO } from "../DTO/notFullTeamDTO";
import { TeamDTO } from "../DTO/teamDTO";
import { TeamWithLogoDTO } from "../DTO/teamWithLogoDTO";
import { Team } from "../models/teams.entity";
import { TeamsService } from "../providers/teams.service";
export declare class TeamsController {
    private TeamService;
    constructor(TeamService: TeamsService);
    addTeam(req: any): Promise<number>;
    banPlayer(req: any): Promise<void>;
    setAsCaptain(req: any): Promise<Player>;
    getAllWithLogos(): Promise<TeamWithLogoDTO[] | null>;
    getAll(req: any): Promise<TeamDTO[] | null>;
    getNumberOfTournamentsWon(id: number): Promise<number>;
    getNumberOfTeams(): Promise<number>;
    getFullTeams(): Promise<FullTeamDTO[] | null>;
    getNotFullTeams(): Promise<NotFullTeamDTO[] | null>;
    getTeamsWithPrecisedNumberOfPlayer(nbr: string): Promise<Team[] | null>;
    getTeamsWithPrecisedFreePlaces(nbr: string): Promise<Team[] | null>;
    getTeam(id: string): Promise<TeamDTO | undefined>;
    updateTeam(req: any): Promise<UpdateResult>;
    deleteTeam(req: any): Promise<DeleteResult>;
}
