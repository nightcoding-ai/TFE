import { Team } from "../../teams/models/teams.entity";
import { SeedEnum } from "../enum/seed.enum";
import { TournamentMatch } from "./tournamentMatch.entity";
import { TournamentParticipation } from "./tournamentParticipation.entity";
export declare class Tournament {
    id: number;
    name: string;
    seed: SeedEnum;
    areInscriptionsClosed: boolean;
    startDate: Date;
    endDate: Date;
    participants: TournamentParticipation[];
    matches: TournamentMatch[];
    winner: Team;
}
