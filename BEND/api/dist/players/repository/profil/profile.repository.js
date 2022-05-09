"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileRepository = void 0;
const typeorm_1 = require("typeorm");
const profile_entity_1 = require("../../models/profile/profile.entity");
class ProfileRepository extends typeorm_1.Repository {
    async updateProfile(idProfile, updatePlayerProfileDTO) {
        const profileRepo = (0, typeorm_1.getRepository)(profile_entity_1.Profile);
        return await profileRepo.update(idProfile, updatePlayerProfileDTO);
    }
}
exports.ProfileRepository = ProfileRepository;
//# sourceMappingURL=profile.repository.js.map