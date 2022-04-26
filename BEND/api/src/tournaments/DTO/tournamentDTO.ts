import { TeamDTO } from "../../teams/DTO/teamDTO";
import { TournamentMatchDTO } from "./tournamentMatchDTO";

export class TournamentDTO {

    id?: number;
    name: string;
    areInscriptionsclosed: boolean;
    seed: number;
    startDate: Date;
    endDate: Date;
    participants?: TeamDTO;
    matches?: TournamentMatchDTO;
}