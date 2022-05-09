import { Repository, UpdateResult } from "typeorm";
import { TournamentMatch } from "../models/tournamentMatch.entity";
export declare class TournamentMatchRepository extends Repository<TournamentMatch> {
    createOne(match: TournamentMatch): Promise<TournamentMatch>;
    saveOne(match: TournamentMatch): Promise<TournamentMatch>;
    getOne(matchId: number): Promise<TournamentMatch>;
    updateMatchScore(matchId: number, matchScoreUpdated: any): Promise<UpdateResult>;
    getAllMatchesForARound(tournamentId: number, round: number): Promise<TournamentMatch[]>;
    getAllMatchesOfATeam(teamId: number): Promise<TournamentMatch[]>;
}
