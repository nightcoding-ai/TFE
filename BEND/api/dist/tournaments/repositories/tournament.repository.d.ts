import { Repository } from "typeorm";
import { createTournamentDTO } from "../DTO/createTournamentDTO";
import { TournamentInterface } from "../interfaces/tournament.interface";
import { TournamentMatch } from "../models/tournamentMatch.entity";
import { Tournament } from "../models/tournaments.entity";
export declare class TournamentRepository extends Repository<Tournament> {
    createOne(createTournamentDTO: createTournamentDTO): Promise<Tournament>;
    saveOne(tournament: TournamentInterface): Promise<Tournament>;
    getOne(tournamentId: number): Promise<Tournament>;
    getOneWithMatches(tournamentId: number): Promise<Tournament>;
    getAll(): Promise<Tournament[]>;
    getTournamentsWonByTeam(teamId: number): Promise<any[]>;
    getOneOnlyMatches(tournamentId: number): Promise<TournamentMatch[]>;
}
