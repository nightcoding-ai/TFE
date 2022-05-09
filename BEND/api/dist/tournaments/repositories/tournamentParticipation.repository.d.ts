import { DeleteResult, Repository } from "typeorm";
import { TournamentParticipation } from "../models/tournamentParticipation.entity";
export declare class TournamentParticipationRepository extends Repository<TournamentParticipation> {
    createOne(tournamentParticipation: TournamentParticipation): Promise<TournamentParticipation>;
    getAll(): Promise<TournamentParticipation[]>;
    getOne(tournamentParticipationId: number): Promise<TournamentParticipation>;
    getAllOfATournament(tournamentId: number): Promise<TournamentParticipation[]>;
    getAllOfATeam(teamId: number): Promise<TournamentParticipation[]>;
    deleteOne(tournamentParticipationId: number): Promise<DeleteResult>;
}
