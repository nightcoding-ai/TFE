import { TeamInterface } from "../../teams/interfaces/teams.interface";
import { BestOfTypeEnum } from "../enum/bestOfType.enum";
import { TournamentInterface } from "./tournament.interface";

export interface TournamentMatchInterface {

    id: number;
    round: number;
    bestOfType: BestOfTypeEnum;
    isOver: boolean;
    teamA: TeamInterface;
    teamAWins: number;
    teamB: TeamInterface;
    teamBWins: number;
    winner: TeamInterface;
    tournament: TournamentInterface;
}