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
exports.TournamentsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const tournament_service_1 = require("../providers/tournament.service");
let TournamentsController = class TournamentsController {
    constructor(tournamentService) {
        this.tournamentService = tournamentService;
    }
    create(req) {
        return this.tournamentService.createOne(req.user.playerID, req.body);
    }
    addParticipant(req) {
        return this.tournamentService.addParticipantAsAdmin(req.user.playerID, req.body);
    }
    registerToTournament(req) {
        return this.tournamentService.addParticipantAsCaptain(req.user.playerID, req.body);
    }
    startTournament(req) {
        return this.tournamentService.startTournament(req.user.playerID, req.body.tournament);
    }
    getAllTournaments() {
        return this.tournamentService.getAllTournaments();
    }
    getAllOfMyTeam(req) {
        return this.tournamentService.getAllOfMyTeam(req.user.playerID, req.body.team);
    }
    getAllMatchesOfTeam(id) {
        return this.tournamentService.getAllMatchesOfTeam(id);
    }
    getAllMatchesOfMyTeam(req) {
        return this.tournamentService.getAllMatchesOfTeam(req.user.playerID);
    }
    getTournament(id) {
        return this.tournamentService.getTournament(id);
    }
    getTournamentMatches(id) {
        return this.tournamentService.getTournamentMatches(id);
    }
    getAllParticipations() {
        return this.tournamentService.getAllPartcipations();
    }
    getMatchesByRound(id, round_id) {
        return this.tournamentService.getMatchesByRound(id, round_id);
    }
    updateMatchScore(tournament, id, req) {
        return this.tournamentService.updateMatchScore(req.user.playerID, tournament, id, req.body);
    }
    deleteAParticipantAsAdmin(req) {
        return this.tournamentService.deleteAParticpantAsAdmin(req.user.playerID, req.body.tournamentParticipation);
    }
    leaveTournament(req) {
        return this.tournamentService.leaveTournament(req.user.playerID, req.body.tournamentParticipation);
    }
    getAllParticipantsOfATournament(tournamentId) {
        return this.tournamentService.getAllOfATournament(tournamentId);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TournamentsController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('add_participant'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TournamentsController.prototype, "addParticipant", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TournamentsController.prototype, "registerToTournament", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('start'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TournamentsController.prototype, "startTournament", null);
__decorate([
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TournamentsController.prototype, "getAllTournaments", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('my_team'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TournamentsController.prototype, "getAllOfMyTeam", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('team/:id/matches'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TournamentsController.prototype, "getAllMatchesOfTeam", null);
__decorate([
    (0, common_1.Get)('my_team/matches'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TournamentsController.prototype, "getAllMatchesOfMyTeam", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TournamentsController.prototype, "getTournament", null);
__decorate([
    (0, common_1.Get)(':id/matches'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TournamentsController.prototype, "getTournamentMatches", null);
__decorate([
    (0, common_1.Get)('all/participations'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TournamentsController.prototype, "getAllParticipations", null);
__decorate([
    (0, common_1.Get)(':id/round/:round_id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('round_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], TournamentsController.prototype, "getMatchesByRound", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)(':tournament/matches/:id/update/score'),
    __param(0, (0, common_1.Param)('tournament')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], TournamentsController.prototype, "updateMatchScore", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('delete'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TournamentsController.prototype, "deleteAParticipantAsAdmin", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('leave'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TournamentsController.prototype, "leaveTournament", null);
__decorate([
    (0, common_1.Get)('/:id/participants'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TournamentsController.prototype, "getAllParticipantsOfATournament", null);
TournamentsController = __decorate([
    (0, common_1.Controller)('tournaments'),
    __metadata("design:paramtypes", [tournament_service_1.TournamentService])
], TournamentsController);
exports.TournamentsController = TournamentsController;
//# sourceMappingURL=tournament.controller.js.map