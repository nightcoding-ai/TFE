import { Team } from "src/teams/models/teams.entity";
import { DeleteResult, getRepository, Repository } from "typeorm";
import { TournamentParticipationDTO } from "../DTO/createTournamentParticipationDTO";
import { TournamentParticipationInterface } from "../interfaces/tournamentParticipation.interface";
import { TournamentParticipation } from "../models/tournamentParticipation.entity";





export class TournamentParticipationRepository extends Repository<TournamentParticipation> {

    async createOne(tournamentParticipation: TournamentParticipation): Promise<TournamentParticipation> {
        const tournamentParticpationRepo = getRepository(TournamentParticipation);
        return await tournamentParticpationRepo.save(tournamentParticipation);
    }

    async getAll(): Promise<TournamentParticipation[]> {
        const tournamentParticpationRepo = getRepository(TournamentParticipation);
        return await tournamentParticpationRepo.find();
    }

    async getOne(tournamentParticipationId: number): Promise<TournamentParticipation> {
        const tournamentParticpationRepo = getRepository(TournamentParticipation);
        return await tournamentParticpationRepo.findOne(tournamentParticipationId);
    }

    async getAllOfATournament(tournamentId: number): Promise<TournamentParticipation[]> {
        const tournamentParticpationRepo = getRepository(TournamentParticipation);
        return await tournamentParticpationRepo.find({
            where: {
                tournament: { 
                    id: tournamentId}
            }
        })
    }

    async getAllOfATeam(teamId: number): Promise<TournamentParticipation[]> {
        const tournamentParticpationRepo = getRepository(TournamentParticipation);
        return await tournamentParticpationRepo.find({where: {
            team: { id: teamId}
        }})
    }

    async deleteOne(tournamentParticipationId: number): Promise<DeleteResult> {
        const tournamentParticpationRepo = getRepository(TournamentParticipation);
        return await tournamentParticpationRepo.delete(tournamentParticipationId);
    }
}