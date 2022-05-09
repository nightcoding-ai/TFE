import { BestOfTypeEnum } from "../enum/bestOfType.enum";
export declare class TournamentMatchDTO {
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
