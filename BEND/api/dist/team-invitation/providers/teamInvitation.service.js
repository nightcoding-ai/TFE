"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamInvitationService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const player_repository_1 = require("../../players/repository/player/player.repository");
const teamInvitation_repository_1 = require("../repositories/teamInvitation.repository");
let TeamInvitationService = class TeamInvitationService {
    constructor(TeamInvitationRepo, PlayerRepo) {
        this.TeamInvitationRepo = TeamInvitationRepo;
        this.PlayerRepo = PlayerRepo;
    }
    async createOne(idPlayer, invitation) {
        try {
            const capitaine = await this.PlayerRepo.getOne(idPlayer);
            const invititationsOfPlayer = await this.TeamInvitationRepo.getAllOfOnePlayer(invitation.player);
            if (capitaine.profile.isCaptain === false || !capitaine || !capitaine.team || capitaine.team.players.length >= 5 || capitaine.team.id !== invitation.team || capitaine.team.players.find((player) => player.profile.role === invitation.role)) {
                return new common_1.UnauthorizedException();
            }
            if (invititationsOfPlayer.find(invitation => invitation.team.id === capitaine.team.id)) {
                return new common_1.UnauthorizedException();
            }
            return await this.TeamInvitationRepo.createNewInvitation(invitation);
        }
        catch (err) {
            throw err;
        }
    }
    async acceptedInvitation(playerId, idNotif) {
        try {
            const notif = await this.TeamInvitationRepo.getOne(idNotif);
            const player = await this.PlayerRepo.getOne(playerId);
            const playerFromNotif = await this.PlayerRepo.getOne(notif.player.id);
            if (!player || player.id !== playerFromNotif.id || player.team || notif.team.players.length >= 5 || notif.team.players.find((compo) => compo.profile.role === player.profile.role) || !notif.team) {
                return new common_1.UnauthorizedException();
            }
            else {
                player.team = notif.team;
                await this.PlayerRepo.savePlayer(player);
                await this.TeamInvitationRepo.deleteAllOfTeamByPlayerRole(player.profile.role, notif.team.id);
                if (notif.team.players.length >= 4) {
                    await this.TeamInvitationRepo.deleteAllOfTeam(notif.team.id);
                }
                return await this.TeamInvitationRepo.deleteAllOfPlayer(notif.player.id);
            }
        }
        catch (err) {
            throw err;
        }
    }
    async getAll() {
        try {
            const result = await this.TeamInvitationRepo.getAll();
            if (!result) {
                return null;
            }
            return result;
        }
        catch (err) {
            throw err;
        }
    }
    async getAllOfAPlayer(idPlayer) {
        try {
            const result = await this.TeamInvitationRepo.getAllOfOnePlayer(idPlayer);
            if (!result) {
                return null;
            }
            return result;
        }
        catch (err) {
            throw err;
        }
    }
    async getAllOfATeam(idPlayer) {
        try {
            const player = await this.PlayerRepo.getOne(idPlayer);
            const result = await this.TeamInvitationRepo.getAllOfOneTeam(player.team.id);
            if (!result) {
                return null;
            }
            return result;
        }
        catch (err) {
            throw err;
        }
    }
    async deleteAllOfAPlayer(idPlayer) {
        try {
            return await this.TeamInvitationRepo.deleteAllOfPlayer(idPlayer);
        }
        catch (err) {
            throw err;
        }
    }
    async deleteOne(idPlayer, idNotif) {
        try {
            const player = await this.PlayerRepo.getOne(idPlayer);
            if (!player) {
                return new common_1.UnauthorizedException();
            }
            return await this.TeamInvitationRepo.deleteOne(idNotif);
        }
        catch (err) {
            throw err;
        }
    }
    async deleteAllExpiredInvitations() {
        try {
            return await this.TeamInvitationRepo.deleteAllExpiredInvitations();
        }
        catch (err) {
            throw err;
        }
    }
};
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_12_HOURS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TeamInvitationService.prototype, "deleteAllExpiredInvitations", null);
TeamInvitationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [teamInvitation_repository_1.TeamInvitationRepository,
        player_repository_1.PlayerRepository])
], TeamInvitationService);
exports.TeamInvitationService = TeamInvitationService;
//# sourceMappingURL=teamInvitation.service.js.map