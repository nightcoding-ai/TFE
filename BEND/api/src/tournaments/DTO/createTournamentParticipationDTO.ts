import { TeamDTO } from "../../teams/DTO/teamDTO";
import { TournamentDTO } from "./tournamentDTO";

export class TournamentParticipationDTO {

    id?: number;
    team: TeamDTO;
    tournament: TournamentDTO;
}