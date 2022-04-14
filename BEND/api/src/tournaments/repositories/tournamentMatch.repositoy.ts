import { getRepository, Repository, UpdateResult } from "typeorm";
import { TournamentMatchInterface } from "../interfaces/tournamentMatch.interface";
import { TournamentMatch } from "../models/tournamentMatch.entity";





export class TournamentMatchRepository extends Repository<TournamentMatch> {

     createOne(match: TournamentMatchInterface): Promise<TournamentMatchInterface> {
        const tournamentMatchRepo = getRepository(TournamentMatch);
        return  tournamentMatchRepo.save(match);
    }

     saveOne(match: TournamentMatchInterface): Promise<TournamentMatchInterface> {
        const tournamentMatchRepo = getRepository(TournamentMatch);
        return  tournamentMatchRepo.save(match);
    }

    
     getOne(matchId: number): Promise<TournamentMatch> {
        const tournamentMatchRepo = getRepository(TournamentMatch);
        return  tournamentMatchRepo.findOne(matchId);
    }

    async updateMatchScore(matchId: number, matchScoreUpdated: any ): Promise<UpdateResult> {
        const tournamentMatchRepo = getRepository(TournamentMatch);
        return await tournamentMatchRepo.update(matchId, matchScoreUpdated);
    }

     getAllMatchesForARound(tournamentId: number, round: number): Promise<TournamentMatchInterface[]> {
        const tournamentMatchRepo = getRepository(TournamentMatch);
        return  tournamentMatchRepo.find({
            where: {
                tournament: {
                    id: tournamentId
                },
                round: round
            }
        })
    }
}