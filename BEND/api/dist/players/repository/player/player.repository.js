"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerRepository = void 0;
const typeorm_1 = require("typeorm");
const userType_enum_1 = require("../../enum/userType.enum");
const player_entity_1 = require("../../models/player/player.entity");
const profile_entity_1 = require("../../models/profile/profile.entity");
let PlayerRepository = class PlayerRepository extends typeorm_1.Repository {
    addPlayer(player) {
        const playerRepo = (0, typeorm_1.getRepository)(player_entity_1.Player);
        return playerRepo.save(player);
    }
    savePlayer(player) {
        const playerRepo = (0, typeorm_1.getRepository)(player_entity_1.Player);
        return playerRepo.save(player);
    }
    getOne(idPlayer) {
        const playerRepo = (0, typeorm_1.getRepository)(player_entity_1.Player);
        return playerRepo.findOneOrFail(idPlayer, {
            relations: ["team"]
        });
    }
    getOneByName(playerName) {
        const playerRepo = (0, typeorm_1.getRepository)(player_entity_1.Player);
        return playerRepo.findOneOrFail({
            name: playerName
        }, {
            relations: ["team"]
        });
    }
    getAll() {
        const playerRepo = (0, typeorm_1.getRepository)(player_entity_1.Player);
        return playerRepo.find({
            withDeleted: true,
            relations: ["team"],
            select: ["id", "name", "team"],
            order: { id: "ASC" }
        });
    }
    getNumberOfPlayers() {
        const playerRepo = (0, typeorm_1.getRepository)(player_entity_1.Player);
        return playerRepo.count();
    }
    getAllByRoleAndFree(roleOfPlayer) {
        const playerRepo = (0, typeorm_1.getRepository)(player_entity_1.Player);
        return playerRepo.find({
            withDeleted: true,
            where: {
                profile: {
                    role: roleOfPlayer,
                },
                team: (0, typeorm_1.IsNull)()
            },
            relations: ["profile"]
        });
    }
    getAllFree() {
        const playerRepo = (0, typeorm_1.getRepository)(player_entity_1.Player);
        return playerRepo.find({
            withDeleted: true,
            where: {
                team: (0, typeorm_1.IsNull)()
            },
            order: {
                id: "ASC"
            }
        });
    }
    updatePlayer(idPlayer, player) {
        const playerRepo = (0, typeorm_1.getRepository)(player_entity_1.Player);
        return playerRepo.update(idPlayer, player);
    }
    async deleteOne(idPlayer) {
        const playerRepo = (0, typeorm_1.getRepository)(player_entity_1.Player);
        const profileRepo = (0, typeorm_1.getRepository)(profile_entity_1.Profile);
        const player = await playerRepo.findOne(idPlayer);
        const profile = player.profile;
        profileRepo.delete(profile);
        return playerRepo.delete(player);
    }
    async isAdmin(idPlayer) {
        const playerRepo = (0, typeorm_1.getRepository)(player_entity_1.Player);
        const p = await playerRepo.findOneOrFail(idPlayer);
        return p.userType === userType_enum_1.UserType.ADMIN ? true : false;
    }
};
PlayerRepository = __decorate([
    (0, typeorm_1.EntityRepository)(player_entity_1.Player)
], PlayerRepository);
exports.PlayerRepository = PlayerRepository;
//# sourceMappingURL=player.repository.js.map