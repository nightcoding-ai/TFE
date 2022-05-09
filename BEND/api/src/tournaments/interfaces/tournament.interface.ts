import { TeamInterface } from "../../teams/interfaces/teams.interface";
import { Team } from "../../teams/models/teams.entity";
import { TournamentMatch } from "../models/tournamentMatch.entity";
import { TournamentParticipation } from "../models/tournamentParticipation.entity";
import { TournamentMatchInterface } from "./tournamentMatch.interface";
import { TournamentParticipationInterface } from "./tournamentParticipation.interface";

export interface TournamentInterface {

    id?: number;
    name: string;
    seed: number;
    areInscriptionsClose?: boolean;
    startDate?: Date;
    endDate?: Date;
    participants?: TournamentParticipation[];
    matches?: TournamentMatch[];
    winner?: Team;
}


