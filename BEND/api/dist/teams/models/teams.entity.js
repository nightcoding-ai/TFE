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
exports.Team = void 0;
const typeorm_1 = require("typeorm");
const joinRequest_entity_1 = require("../../join-request/models/joinRequest.entity");
const player_entity_1 = require("../../players/models/player/player.entity");
const teamInvitation_entity_1 = require("../../team-invitation/models/teamInvitation.entity");
const tournamentMatch_entity_1 = require("../../tournaments/models/tournamentMatch.entity");
const tournamentParticipation_entity_1 = require("../../tournaments/models/tournamentParticipation.entity");
const tournaments_entity_1 = require("../../tournaments/models/tournaments.entity");
let Team = class Team {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Team.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Team.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 3 }),
    __metadata("design:type", String)
], Team.prototype, "abbreviation", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Team.prototype, "logo", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => player_entity_1.Player, player => player.team, { cascade: true, eager: true }),
    __metadata("design:type", Array)
], Team.prototype, "players", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => tournamentParticipation_entity_1.TournamentParticipation, tournamentParticipation => tournamentParticipation.team),
    __metadata("design:type", Array)
], Team.prototype, "tournamentParticipations", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => tournamentMatch_entity_1.TournamentMatch, tournamentMatch => tournamentMatch.teamA),
    __metadata("design:type", Array)
], Team.prototype, "sideA", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => tournamentMatch_entity_1.TournamentMatch, tournamentMatch => tournamentMatch.teamB),
    __metadata("design:type", Array)
], Team.prototype, "sideB", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => tournamentMatch_entity_1.TournamentMatch, tournamentMatch => tournamentMatch.winner),
    __metadata("design:type", Array)
], Team.prototype, "matchesWon", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => teamInvitation_entity_1.TeamInvitation, teamInvitation => teamInvitation.team, { nullable: true }),
    __metadata("design:type", Array)
], Team.prototype, "invitationToPlayer", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => joinRequest_entity_1.JoinRequest, joinRequest => joinRequest.team, { nullable: true }),
    __metadata("design:type", Array)
], Team.prototype, "joinRequestsReceived", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => tournaments_entity_1.Tournament, tournament => tournament.winner),
    __metadata("design:type", tournaments_entity_1.Tournament)
], Team.prototype, "tournamentWins", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Team.prototype, "deletedAt", void 0);
Team = __decorate([
    (0, typeorm_1.Entity)()
], Team);
exports.Team = Team;
//# sourceMappingURL=teams.entity.js.map