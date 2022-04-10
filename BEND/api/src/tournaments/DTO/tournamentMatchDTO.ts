import { TeamDTO } from "src/teams/DTO/teamDTO";
import { BestOfTypeEnum } from "../enum/bestOfType.enum";
import { TournamentDTO } from "./tournamentDTO";

export class TournamentMatchDTO {

    id: number;
    round: number;
    bestOfType: BestOfTypeEnum;
    isOver: boolean;
    teamA: TeamDTO;
    teamAWins: number;
    teamB: TeamDTO;
    teamBWins: number;
    winner: TeamDTO;
    tournament: TournamentDTO;
}