import { TeamDTO } from "../../teams/DTO/teamDTO";
import { BestOfTypeEnum } from "../enum/bestOfType.enum";
import { TournamentDTO } from "./tournamentDTO";

export class TournamentMatchDTO {

    id?: number;
    round: number;
    bestOfType: BestOfTypeEnum;
    isOver: boolean;
    teamA: string;
    teamALogo: string;
    teamAWins: number;
    teamB: string;
    teamBLogo: string;
    teamBWins: number;
    winner: string;
    tournament: string;
}