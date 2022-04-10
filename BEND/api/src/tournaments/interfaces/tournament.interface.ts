import { TournamentMatch } from "../models/tournamentMatch.entity";
import { TournamentParticipation } from "../models/tournamentParticipation.entity";
import { TournamentMatchInterface } from "./tournamentMatch.interface";
import { TournamentParticipationInterface } from "./tournamentParticipation.interface";

export interface TournamentInterface {

    id: number;
    name: string;
    isFinished: boolean; 
    seed: number;
    startDate?: Date;
    endDate?: Date;
    participants?: TournamentParticipationInterface[];
    matches?: TournamentMatchInterface[];
}