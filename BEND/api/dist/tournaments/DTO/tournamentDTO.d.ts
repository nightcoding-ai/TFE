import { TeamDTO } from "../../teams/DTO/teamDTO";
import { TournamentMatch } from "../models/tournamentMatch.entity";
export declare class TournamentDTO {
    id?: number;
    name: string;
    areInscriptionsclosed: boolean;
    seed: number;
    startDate: Date;
    endDate: Date;
    participants?: TeamDTO;
    matches?: TournamentMatch[];
}
