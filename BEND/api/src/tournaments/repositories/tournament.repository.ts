import { getRepository, Repository } from "typeorm";
import { createTournamentDTO } from "../DTO/createTournamentDTO";
import { TournamentInterface } from "../interfaces/tournament.interface";
import { Tournament } from "../models/tournaments.entity";

export class TournamentRepository extends Repository<Tournament> {

    async createOne(createTournamentDTO: TournamentInterface): Promise<TournamentInterface>{ 
        const tournamentRepo = getRepository(Tournament);
        return await tournamentRepo.save(createTournamentDTO);
    }

    async getOne(tournamentId: number): Promise<TournamentInterface> {
        const tournamentRepo = getRepository(Tournament);
        return await tournamentRepo.findOne(tournamentId);
    }

}