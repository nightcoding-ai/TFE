import { Team } from "../../teams/models/teams.entity";
import { TournamentMatch } from "../models/tournamentMatch.entity";

export class createTournamentDTO {

    id?: number;
    name: string;
    seed: number;
    areInscriptionsClosed?: boolean;
    startDate: Date;
    endDate?: Date;
    participants?: Team[];
    matches?: TournamentMatch[];
    winner?: Team;
}


