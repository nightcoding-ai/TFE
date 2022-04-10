import { Team } from "src/teams/models/teams.entity";
import { getRepository, Repository } from "typeorm";
import { TournamentParticipationDTO } from "../DTO/createTournamentParticipationDTO";
import { TournamentParticipationInterface } from "../interfaces/tournamentParticipation.interface";
import { TournamentParticipation } from "../models/tournamentParticipation.entity";





export class TournamentParticipationRepository extends Repository<TournamentParticipation> {

    async createOne(tournamentParticipation: TournamentParticipation): Promise<TournamentParticipation> {
        const tournamentParticpationRepo = getRepository(TournamentParticipation);
        return await tournamentParticpationRepo.save(tournamentParticipation);
    }

    async getAll(): Promise<TournamentParticipationInterface[]> {
        const tournamentParticpationRepo = getRepository(TournamentParticipation);
        return await tournamentParticpationRepo.find();
    }

    async getAllOfATournament(tournamentId: number): Promise<TournamentParticipationInterface[]> {
        const tournamentParticpationRepo = getRepository(TournamentParticipation);
        return await tournamentParticpationRepo.find({where: {
            tournament: { id: tournamentId}
            }
        })
    }

    async getAllOfATeam(teamId: number): Promise<TournamentParticipationInterface[]> {
        const tournamentParticpationRepo = getRepository(TournamentParticipation);
        return await tournamentParticpationRepo.find({where: {
            team: { id:teamId}
        }})
    }
}