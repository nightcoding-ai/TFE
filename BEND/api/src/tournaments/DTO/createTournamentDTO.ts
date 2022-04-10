import { Team } from "src/teams/models/teams.entity";
import { TournamentMatch } from "../models/tournamentMatch.entity";

export class createTournamentDTO {

    id?: number;
    name: string;
    isFinished: Date;
    seed: number;
    startDate: Date;
    endDate: Date;
    participants?: Team;
    matches?: TournamentMatch;
}