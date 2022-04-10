import { TeamDTO } from "src/teams/DTO/teamDTO";
import { TournamentMatch } from "../models/tournamentMatch.entity";
import { TournamentMatchDTO } from "./tournamentMatchDTO";

export class TournamentDTO {

    id?: number;
    name: string;
    isFinished: Date;
    seed: number;
    startDate: Date;
    endDate: Date;
    participants?: TeamDTO;
    matches?: TournamentMatchDTO;
}