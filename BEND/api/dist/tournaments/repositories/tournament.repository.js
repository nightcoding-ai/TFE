"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TournamentRepository = void 0;
const typeorm_1 = require("typeorm");
const tournaments_entity_1 = require("../models/tournaments.entity");
class TournamentRepository extends typeorm_1.Repository {
    createOne(createTournamentDTO) {
        const tournamentRepo = (0, typeorm_1.getRepository)(tournaments_entity_1.Tournament);
        return tournamentRepo.save(createTournamentDTO);
    }
    saveOne(tournament) {
        const tournamentRepo = (0, typeorm_1.getRepository)(tournaments_entity_1.Tournament);
        return tournamentRepo.save(tournament);
    }
    getOne(tournamentId) {
        const tournamentRepo = (0, typeorm_1.getRepository)(tournaments_entity_1.Tournament);
        return tournamentRepo.findOne(tournamentId);
    }
    getOneWithMatches(tournamentId) {
        const tournamentRepo = (0, typeorm_1.getRepository)(tournaments_entity_1.Tournament);
        return tournamentRepo.findOne(tournamentId, { relations: ["matches"] });
    }
    getAll() {
        const tournamentRepo = (0, typeorm_1.getRepository)(tournaments_entity_1.Tournament);
        return tournamentRepo.find({ relations: ["matches"] });
    }
    getTournamentsWonByTeam(teamId) {
        const tournamentRepo = (0, typeorm_1.getRepository)(tournaments_entity_1.Tournament);
        const result = tournamentRepo.find({ where: { winner: { id: teamId } } });
        return result;
    }
    async getOneOnlyMatches(tournamentId) {
        const tournamentRepo = (0, typeorm_1.getRepository)(tournaments_entity_1.Tournament);
        const tournament = await tournamentRepo.findOne(tournamentId, {
            relations: ["matches"],
        });
        return tournament.matches;
    }
}
exports.TournamentRepository = TournamentRepository;
//# sourceMappingURL=tournament.repository.js.map