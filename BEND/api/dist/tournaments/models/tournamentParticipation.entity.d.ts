import { Team } from "../../teams/models/teams.entity";
import { Tournament } from "./tournaments.entity";
export declare class TournamentParticipation {
    id: number;
    tournament: Tournament;
    team: Team;
}
