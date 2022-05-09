"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoinRequestRepository = void 0;
const typeorm_1 = require("typeorm");
const joinRequest_entity_1 = require("../models/joinRequest.entity");
class JoinRequestRepository extends typeorm_1.Repository {
    async createOne(joinRequest) {
        const reqRepo = (0, typeorm_1.getRepository)(joinRequest_entity_1.JoinRequest);
        return await reqRepo.save(joinRequest);
    }
    async getOne(joinRequestId) {
        const reqRepo = (0, typeorm_1.getRepository)(joinRequest_entity_1.JoinRequest);
        return await reqRepo.findOneOrFail(joinRequestId);
    }
    async saveRequest(request) {
        const reqRepo = (0, typeorm_1.getRepository)(joinRequest_entity_1.JoinRequest);
        return await reqRepo.save(request);
    }
    async getAll() {
        const reqRepo = (0, typeorm_1.getRepository)(joinRequest_entity_1.JoinRequest);
        return await reqRepo.find({ withDeleted: true });
    }
    async getAllOfATeam(teamId) {
        const reqRepo = (0, typeorm_1.getRepository)(joinRequest_entity_1.JoinRequest);
        return await reqRepo.find({ withDeleted: true,
            where: {
                team: { id: teamId }
            },
            order: {
                id: "ASC"
            }
        });
    }
    async getAllOfAPlayer(playerId) {
        const reqRepo = (0, typeorm_1.getRepository)(joinRequest_entity_1.JoinRequest);
        return await reqRepo.find({ withDeleted: true,
            where: {
                player: { id: playerId }
            }
        });
    }
    async getRequestToTeam(playerId, teamId) {
        const reqRepo = (0, typeorm_1.getRepository)(joinRequest_entity_1.JoinRequest);
        return await reqRepo.find({ withDeleted: true,
            where: {
                player: { id: playerId },
                team: { id: teamId }
            }
        });
    }
    async deleteOne(joinRequestId) {
        const reqRepo = (0, typeorm_1.getRepository)(joinRequest_entity_1.JoinRequest);
        return await reqRepo.softDelete(joinRequestId);
    }
    async deleteAllOfAPlayer(playerId) {
        const reqRepo = (0, typeorm_1.getRepository)(joinRequest_entity_1.JoinRequest);
        return await reqRepo.softDelete({ player: { id: playerId } });
    }
    async deleteAllOfATeam(teamId) {
        const reqRepo = (0, typeorm_1.getRepository)(joinRequest_entity_1.JoinRequest);
        return await reqRepo.softDelete({ team: { id: teamId } });
    }
    async deleteAllOfATeamByRole(roleToDelete, team) {
        const reqRepo = (0, typeorm_1.getRepository)(joinRequest_entity_1.JoinRequest);
        const allReqOfTeamByRole = await reqRepo.find({ where: { role: roleToDelete,
                team: team }
        });
        return await reqRepo.softDelete(allReqOfTeamByRole);
    }
    async deleteAllExpiredRequests() {
        const reqRepo = (0, typeorm_1.getRepository)(joinRequest_entity_1.JoinRequest);
        const today = new Date();
        return await reqRepo.softDelete({ expiredAt: (0, typeorm_1.LessThan)(today) });
    }
    async getAllWithExpiredRequests() {
        const reqRepo = (0, typeorm_1.getRepository)(joinRequest_entity_1.JoinRequest);
        return await reqRepo.find({ withDeleted: true,
            order: {
                id: "ASC"
            },
        });
    }
}
exports.JoinRequestRepository = JoinRequestRepository;
//# sourceMappingURL=joinRequest.repository.js.map