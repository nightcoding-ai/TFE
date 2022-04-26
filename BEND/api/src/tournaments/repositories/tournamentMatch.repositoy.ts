import { getRepository, Repository, UpdateResult } from "typeorm";
import { TournamentMatch } from "../models/tournamentMatch.entity";





export class TournamentMatchRepository extends Repository<TournamentMatch> {

     createOne(match: TournamentMatch): Promise<TournamentMatch> {
        const tournamentMatchRepo = getRepository(TournamentMatch);
        return tournamentMatchRepo.save(match);
    }

     saveOne(match: TournamentMatch): Promise<TournamentMatch> {
        const tournamentMatchRepo = getRepository(TournamentMatch);
        return tournamentMatchRepo.save(match);
    }

    
    getOne(matchId: number): Promise<TournamentMatch> {
        const tournamentMatchRepo = getRepository(TournamentMatch);
        return  tournamentMatchRepo.findOne(matchId);
    }

    async updateMatchScore(matchId: number, matchScoreUpdated: any ): Promise<UpdateResult> {
        const tournamentMatchRepo = getRepository(TournamentMatch);
        return await tournamentMatchRepo.update(matchId, matchScoreUpdated);
    }

    getAllMatchesForARound(tournamentId: number, round: number): Promise<TournamentMatch[]> {
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

    getAllMatchesOfATeam(teamId: number): Promise<TournamentMatch[]> {
        const tournamentMatchRepo = getRepository(TournamentMatch);
        return tournamentMatchRepo.find({
            where: [
                { teamA: { id : teamId}},
                { teamB: { id: teamId}}
            ],
            order: { round: "ASC"},
            relations: ["tournament"]
        },
        );
    }
}