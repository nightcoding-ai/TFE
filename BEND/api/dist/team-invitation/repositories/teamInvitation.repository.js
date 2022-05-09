"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamInvitationRepository = void 0;
const typeorm_1 = require("typeorm");
const teamInvitation_entity_1 = require("../models/teamInvitation.entity");
class TeamInvitationRepository extends typeorm_1.Repository {
    async createNewInvitation(newInvitation) {
        const teamInvRepo = (0, typeorm_1.getRepository)(teamInvitation_entity_1.TeamInvitation);
        return await teamInvRepo.save(newInvitation);
    }
    async getOne(idNotif) {
        const teamInvRepo = (0, typeorm_1.getRepository)(teamInvitation_entity_1.TeamInvitation);
        return await teamInvRepo.findOne(idNotif);
    }
    async getAll() {
        const teamInvRepo = (0, typeorm_1.getRepository)(teamInvitation_entity_1.TeamInvitation);
        return await teamInvRepo.find({ withDeleted: true });
    }
    async getOneOfOnePlayer(idPlayer) {
        const teamInvRepo = (0, typeorm_1.getRepository)(teamInvitation_entity_1.TeamInvitation);
        return await teamInvRepo.findOne({ where: {
                player: {
                    id: idPlayer
                }
            } });
    }
    async getAllOfOnePlayer(idPlayer) {
        const teamInvRepo = (0, typeorm_1.getRepository)(teamInvitation_entity_1.TeamInvitation);
        return await teamInvRepo.find({ withDeleted: true,
            where: {
                player: {
                    id: idPlayer
                }
            } });
    }
    async getAllOfOneTeam(idTeam) {
        const teamInvRepo = (0, typeorm_1.getRepository)(teamInvitation_entity_1.TeamInvitation);
        return await teamInvRepo.find({ withDeleted: true,
            where: {
                team: {
                    id: idTeam
                }
            } });
    }
    async deleteAllOfPlayer(idPlayer) {
        const teamInvRepo = (0, typeorm_1.getRepository)(teamInvitation_entity_1.TeamInvitation);
        return await teamInvRepo.softDelete({ player: {
                id: idPlayer
            } });
    }
    async deleteAllOfTeam(idTeam) {
        const teamInvRepo = (0, typeorm_1.getRepository)(teamInvitation_entity_1.TeamInvitation);
        return await teamInvRepo.softDelete({ team: {
                id: idTeam
            } });
    }
    async deleteAllOfTeamByPlayerRole(roleToDelete, idTeam) {
        const teamInvRepo = (0, typeorm_1.getRepository)(teamInvitation_entity_1.TeamInvitation);
        const allInvOfTeamByRole = await teamInvRepo.find({ where: { role: roleToDelete,
                team: { id: idTeam } }
        });
        return await teamInvRepo.softDelete(allInvOfTeamByRole);
    }
    async deleteOne(idNotif) {
        const teamInvRepo = (0, typeorm_1.getRepository)(teamInvitation_entity_1.TeamInvitation);
        return await teamInvRepo.softDelete(idNotif);
    }
    async deleteAllExpiredInvitations() {
        const teamInvRepo = (0, typeorm_1.getRepository)(teamInvitation_entity_1.TeamInvitation);
        const today = new Date();
        return await teamInvRepo.softDelete({ expiredAt: (0, typeorm_1.LessThan)(today) });
    }
}
exports.TeamInvitationRepository = TeamInvitationRepository;
//# sourceMappingURL=teamInvitation.repository.js.map