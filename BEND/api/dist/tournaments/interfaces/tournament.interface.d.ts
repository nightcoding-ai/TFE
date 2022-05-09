import { Team } from "../../teams/models/teams.entity";
import { TournamentMatch } from "../models/tournamentMatch.entity";
import { TournamentParticipation } from "../models/tournamentParticipation.entity";
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
