"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TournamentMatchRepository = void 0;
const typeorm_1 = require("typeorm");
const tournamentMatch_entity_1 = require("../models/tournamentMatch.entity");
class TournamentMatchRepository extends typeorm_1.Repository {
    createOne(match) {
        const tournamentMatchRepo = (0, typeorm_1.getRepository)(tournamentMatch_entity_1.TournamentMatch);
        return tournamentMatchRepo.save(match);
    }
    saveOne(match) {
        const tournamentMatchRepo = (0, typeorm_1.getRepository)(tournamentMatch_entity_1.TournamentMatch);
        return tournamentMatchRepo.save(match);
    }
    getOne(matchId) {
        const tournamentMatchRepo = (0, typeorm_1.getRepository)(tournamentMatch_entity_1.TournamentMatch);
        return tournamentMatchRepo.findOne(matchId);
    }
    async updateMatchScore(matchId, matchScoreUpdated) {
        const tournamentMatchRepo = (0, typeorm_1.getRepository)(tournamentMatch_entity_1.TournamentMatch);
        return await tournamentMatchRepo.update(matchId, matchScoreUpdated);
    }
    getAllMatchesForARound(tournamentId, round) {
        const tournamentMatchRepo = (0, typeorm_1.getRepository)(tournamentMatch_entity_1.TournamentMatch);
        return tournamentMatchRepo.find({
            where: {
                tournament: {
                    id: tournamentId
                },
                round: round
            }
        });
    }
    getAllMatchesOfATeam(teamId) {
        const tournamentMatchRepo = (0, typeorm_1.getRepository)(tournamentMatch_entity_1.TournamentMatch);
        return tournamentMatchRepo.find({
            where: [
                { teamA: { id: teamId } },
                { teamB: { id: teamId } }
            ],
            order: { round: "ASC" },
            relations: ["tournament"]
        });
    }
}
exports.TournamentMatchRepository = TournamentMatchRepository;
//# sourceMappingURL=tournamentMatch.repositoy.js.map