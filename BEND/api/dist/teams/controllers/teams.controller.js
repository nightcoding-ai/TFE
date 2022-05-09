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
exports.TeamsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const teams_service_1 = require("../providers/teams.service");
let TeamsController = class TeamsController {
    constructor(TeamService) {
        this.TeamService = TeamService;
    }
    addTeam(req) {
        return this.TeamService.create(req.user.playerID, req.body);
    }
    banPlayer(req) {
        return this.TeamService.banPlayer(req.user.playerID, req.body.idPlayer);
    }
    setAsCaptain(req) {
        return this.TeamService.setAsCaptain(req.user.playerID, req.body.idPlayer);
    }
    getAllWithLogos() {
        return this.TeamService.getAllWithLogos();
    }
    getAll(req) {
        return this.TeamService.getAll(req.user.playerID);
    }
    getNumberOfTournamentsWon(id) {
        return this.TeamService.getNumberOfTournamentsWon(id);
    }
    getNumberOfTeams() {
        return this.TeamService.getNumberOfTeams();
    }
    getFullTeams() {
        return this.TeamService.getFullTeams();
    }
    getNotFullTeams() {
        return this.TeamService.getNotFullTeams();
    }
    getTeamsWithPrecisedNumberOfPlayer(nbr) {
        return this.TeamService.getTeamsWithPrecisedNumberOfPlayers(nbr);
    }
    getTeamsWithPrecisedFreePlaces(nbr) {
        return this.TeamService.getTeamsWithPrecisedFreePlaces(nbr);
    }
    getTeam(id) {
        return this.TeamService.getTeam(parseInt(id));
    }
    updateTeam(req) {
        return this.TeamService.updateTeam(req.user.playerID, req.body);
    }
    deleteTeam(req) {
        return this.TeamService.deleteTeam(req.user.playerID);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(''),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TeamsController.prototype, "addTeam", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('ban'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TeamsController.prototype, "banPlayer", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('setas_captain'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TeamsController.prototype, "setAsCaptain", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TeamsController.prototype, "getAllWithLogos", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('all'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TeamsController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id/tournaments_Won'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TeamsController.prototype, "getNumberOfTournamentsWon", null);
__decorate([
    (0, common_1.Get)('count_teams'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TeamsController.prototype, "getNumberOfTeams", null);
__decorate([
    (0, common_1.Get)('full'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TeamsController.prototype, "getFullTeams", null);
__decorate([
    (0, common_1.Get)('not_full'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TeamsController.prototype, "getNotFullTeams", null);
__decorate([
    (0, common_1.Get)('with/:nbr'),
    __param(0, (0, common_1.Param)('nbr')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TeamsController.prototype, "getTeamsWithPrecisedNumberOfPlayer", null);
__decorate([
    (0, common_1.Get)('free_slots/:nbr'),
    __param(0, (0, common_1.Param)('nbr')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TeamsController.prototype, "getTeamsWithPrecisedFreePlaces", null);
__decorate([
    (0, common_1.Get)('single/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TeamsController.prototype, "getTeam", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('modify'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TeamsController.prototype, "updateTeam", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('delete'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TeamsController.prototype, "deleteTeam", null);
TeamsController = __decorate([
    (0, common_1.Controller)('teams'),
    __metadata("design:paramtypes", [teams_service_1.TeamsService])
], TeamsController);
exports.TeamsController = TeamsController;
//# sourceMappingURL=teams.controller.js.map