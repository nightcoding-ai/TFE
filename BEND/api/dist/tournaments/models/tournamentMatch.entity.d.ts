import { Team } from "../../teams/models/teams.entity";
import { BestOfTypeEnum } from "../enum/bestOfType.enum";
import { Tournament } from "./tournaments.entity";
export declare class TournamentMatch {
    id: number;
    round: number;
    order: number;
    bestOfType: BestOfTypeEnum;
    isOver: boolean;
    teamA: Team;
    teamAWins: number;
    teamB: Team;
    teamBWins: number;
    winner: Team;
    tournament: Tournament;
}
