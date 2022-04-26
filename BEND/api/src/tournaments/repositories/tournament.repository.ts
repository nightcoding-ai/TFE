import { matches } from "class-validator";
import { getRepository, Repository } from "typeorm";
import { TournamentInterface } from "../interfaces/tournament.interface";
import { TournamentMatch } from "../models/tournamentMatch.entity";
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

    getOneWithMatches(tournamentId: number): Promise<Tournament> {
        const tournamentRepo = getRepository(Tournament);
        return  tournamentRepo.findOne(tournamentId, { relations: ["matches"]});
    }

    getAll(): Promise<Tournament[]> {
        const tournamentRepo = getRepository(Tournament);
        return tournamentRepo.find();
    }

    async getOneOnlyMatches(tournamentId: number): Promise<TournamentMatch[]> {
        const tournamentRepo = getRepository(Tournament);
        const tournament = await tournamentRepo.findOne(tournamentId, {
            relations: ["matches"],
        });
        return tournament.matches;

    } 
}