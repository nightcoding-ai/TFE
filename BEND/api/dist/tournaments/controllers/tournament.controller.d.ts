import { UnauthorizedException } from "@nestjs/common";
import { DeleteResult } from "typeorm";
import { TournamentDTO } from "../DTO/tournamentDTO";
import { TournamentMatchDTO } from "../DTO/tournamentMatchDTO";
import { TournamentParticipantsDTO } from "../DTO/tournamentParticipantsDTO";
import { TournamentMatch } from "../models/tournamentMatch.entity";
import { TournamentParticipation } from "../models/tournamentParticipation.entity";
import { Tournament } from "../models/tournaments.entity";
import { TournamentService } from "../providers/tournament.service";
export declare class TournamentsController {
    private tournamentService;
    constructor(tournamentService: TournamentService);
    create(req: any): Promise<Tournament | UnauthorizedException>;
    addParticipant(req: any): Promise<TournamentParticipation | UnauthorizedException>;
    registerToTournament(req: any): Promise<TournamentParticipation | UnauthorizedException>;
    startTournament(req: any): Promise<any | UnauthorizedException>;
    getAllTournaments(): Promise<TournamentDTO[] | null>;
    getAllOfMyTeam(req: any): Promise<TournamentDTO[] | null | UnauthorizedException>;
    getAllMatchesOfTeam(id: number): Promise<TournamentMatchDTO[] | null>;
    getAllMatchesOfMyTeam(req: any): Promise<TournamentMatchDTO[] | null>;
    getTournament(id: number): Promise<Tournament | undefined>;
    getTournamentMatches(id: number): Promise<TournamentMatch[] | null>;
    getAllParticipations(): Promise<TournamentParticipation[] | null>;
    getMatchesByRound(id: number, round_id: number): Promise<TournamentMatch[] | null>;
    updateMatchScore(tournament: number, id: number, req: any): Promise<any | UnauthorizedException>;
    deleteAParticipantAsAdmin(req: any): Promise<DeleteResult>;
    leaveTournament(req: any): Promise<DeleteResult>;
    getAllParticipantsOfATournament(tournamentId: number): Promise<TournamentParticipantsDTO[] | null>;
}
