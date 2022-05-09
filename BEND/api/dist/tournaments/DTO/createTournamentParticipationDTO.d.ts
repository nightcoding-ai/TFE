import { TeamDTO } from "../../teams/DTO/teamDTO";
import { TournamentDTO } from "./tournamentDTO";
export declare class TournamentParticipationDTO {
    id?: number;
    team: TeamDTO;
    tournament: TournamentDTO;
}
