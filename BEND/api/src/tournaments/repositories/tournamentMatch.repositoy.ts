import { getRepository, Repository } from "typeorm";
import { TournamentMatchInterface } from "../interfaces/tournamentMatch.interface";
import { TournamentMatch } from "../models/tournamentMatch.entity";





export class TournamentMatchRepository extends Repository<TournamentMatch> {

    async createOne(match: TournamentMatchInterface): Promise<TournamentMatchInterface> {
        const tournamentMatchRepo = getRepository(TournamentMatch);
        return await tournamentMatchRepo.save(match);
    }
}