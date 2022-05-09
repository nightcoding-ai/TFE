import { TeamInterface } from "../../teams/interfaces/teams.interface";
import { TournamentInterface } from "./tournament.interface";

export interface TournamentParticipationInterface {

    id: number;
    tournament: TournamentInterface;
    team: TeamInterface;
}