import { BestOfType } from "../bestOfType.enum";
import { Team } from "./team.interface";


export interface Match {
    
    id?: number;
    round: number;
    bestOfType: BestOfType;
    isOver: boolean;
    teamA: Team;
    teamALogo?: string;
    teamAWins: number;
    teamB: Team;
    teamBLogo?: string;
    teamBWins: number;
    winner: string;
    tournament: string;
}