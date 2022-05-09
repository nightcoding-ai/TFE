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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamInvitationController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const teamInvitation_service_1 = require("../providers/teamInvitation.service");
let TeamInvitationController = class TeamInvitationController {
    constructor(TeamInvitationService) {
        this.TeamInvitationService = TeamInvitationService;
    }
    create(req) {
        return this.TeamInvitationService.createOne(req.user.playerID, req.body);
    }
    accepteInvitation(req) {
        return this.TeamInvitationService.acceptedInvitation(req.user.playerID, req.body.idNotif);
    }
    getAll() {
        return this.TeamInvitationService.getAll();
    }
    getAllOfteam(req) {
        return this.TeamInvitationService.getAllOfATeam(req.user.playerID);
    }
    getAllOfAPlayer(req) {
        return this.TeamInvitationService.getAllOfAPlayer(req.user.playerID);
    }
    deleteOne(idNotif, req) {
        return this.TeamInvitationService.deleteOne(req.user.playerID, idNotif);
    }
    deleteAllOfPlayer(req) {
        return this.TeamInvitationService.deleteAllOfAPlayer(req.user.playerID);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TeamInvitationController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/accept'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TeamInvitationController.prototype, "accepteInvitation", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TeamInvitationController.prototype, "getAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('my_team'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TeamInvitationController.prototype, "getAllOfteam", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('mine'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TeamInvitationController.prototype, "getAllOfAPlayer", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], TeamInvitationController.prototype, "deleteOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('remove_all'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TeamInvitationController.prototype, "deleteAllOfPlayer", null);
TeamInvitationController = __decorate([
    (0, common_1.Controller)('invitations'),
    __metadata("design:paramtypes", [teamInvitation_service_1.TeamInvitationService])
], TeamInvitationController);
exports.TeamInvitationController = TeamInvitationController;
//# sourceMappingURL=teamInvitation.controller.js.map