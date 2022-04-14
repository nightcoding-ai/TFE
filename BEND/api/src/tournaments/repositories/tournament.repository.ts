import { getRepository, Repository } from "typeorm";
import { createTournamentDTO } from "../DTO/createTournamentDTO";
import { TournamentInterface } from "../interfaces/tournament.interface";
import { Tournament } from "../models/tournaments.entity";

export class TournamentRepository extends Repository<Tournament> {

     createOne(createTournamentDTO: TournamentInterface): Promise<Tournament> { 
        const tournamentRepo = getRepository(Tournament);
        return  tournamentRepo.save(createTournamentDTO);
    }

     saveOne(tournament: TournamentInterface): Promise<Tournament> {
        const tournamentRepo = getRepository(Tournament);
        return  tournamentRepo.save(tournament);
    }

     getOne(tournamentId: number): Promise<Tournament> {
        const tournamentRepo = getRepository(Tournament);
        return  tournamentRepo.findOne(tournamentId);
    }

    async getOneOnlyMatches(tournamentId: number): Promise<any> {
        const tournamentRepo = getRepository(Tournament);
        const tournament = await tournamentRepo.findOne(tournamentId);
        return tournament.matches;

    }   
}