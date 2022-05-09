"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TournamentParticipationRepository = void 0;
const typeorm_1 = require("typeorm");
const tournamentParticipation_entity_1 = require("../models/tournamentParticipation.entity");
class TournamentParticipationRepository extends typeorm_1.Repository {
    async createOne(tournamentParticipation) {
        const tournamentParticpationRepo = (0, typeorm_1.getRepository)(tournamentParticipation_entity_1.TournamentParticipation);
        return await tournamentParticpationRepo.save(tournamentParticipation);
    }
    async getAll() {
        const tournamentParticpationRepo = (0, typeorm_1.getRepository)(tournamentParticipation_entity_1.TournamentParticipation);
        return await tournamentParticpationRepo.find();
    }
    async getOne(tournamentParticipationId) {
        const tournamentParticpationRepo = (0, typeorm_1.getRepository)(tournamentParticipation_entity_1.TournamentParticipation);
        return await tournamentParticpationRepo.findOne(tournamentParticipationId);
    }
    async getAllOfATournament(tournamentId) {
        const tournamentParticpationRepo = (0, typeorm_1.getRepository)(tournamentParticipation_entity_1.TournamentParticipation);
        return await tournamentParticpationRepo.find({ tournament: { id: tournamentId } });
    }
    async getAllOfATeam(teamId) {
        const tournamentParticpationRepo = (0, typeorm_1.getRepository)(tournamentParticipation_entity_1.TournamentParticipation);
        return await tournamentParticpationRepo.find({
            where: {
                team: {
                    id: teamId
                }
            }
        });
    }
    async deleteOne(tournamentParticipationId) {
        const tournamentParticpationRepo = (0, typeorm_1.getRepository)(tournamentParticipation_entity_1.TournamentParticipation);
        return await tournamentParticpationRepo.delete(tournamentParticipationId);
    }
}
exports.TournamentParticipationRepository = TournamentParticipationRepository;
//# sourceMappingURL=tournamentParticipation.repository.js.map