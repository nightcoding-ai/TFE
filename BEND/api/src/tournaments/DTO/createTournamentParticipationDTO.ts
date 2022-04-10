import { TeamDTO } from "src/teams/DTO/teamDTO";
import { TournamentDTO } from "./tournamentDTO";

export class TournamentParticipationDTO {

    id?: number;
    team: TeamDTO;
    tournament: TournamentDTO;
}