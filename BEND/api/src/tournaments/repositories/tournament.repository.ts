import { getRepository, Repository } from "typeorm";
import { createTournamentDTO } from "../DTO/createTournamentDTO";
import { TournamentInterface } from "../interfaces/tournament.interface";
import { Tournament } from "../models/tournaments.entity";

export class TournamentRepository extends Repository<Tournament> {

    async createOne(createTournamentDTO: TournamentInterface): Promise<Tournament> { 
        const tournamentRepo = getRepository(Tournament);
        return await tournamentRepo.save(createTournamentDTO);
    }

    async saveOne(tournament: TournamentInterface): Promise<Tournament> {
        const tournamentRepo = getRepository(Tournament);
        return await tournamentRepo.save(tournament);
    }

    async getOne(tournamentId: number): Promise<Tournament> {
        const tournamentRepo = getRepository(Tournament);
        return await tournamentRepo.findOne(tournamentId);
    }

}