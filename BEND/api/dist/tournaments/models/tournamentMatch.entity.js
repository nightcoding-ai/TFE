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
exports.TournamentMatch = void 0;
const typeorm_1 = require("typeorm");
const teams_entity_1 = require("../../teams/models/teams.entity");
const bestOfType_enum_1 = require("../enum/bestOfType.enum");
const tournaments_entity_1 = require("./tournaments.entity");
let TournamentMatch = class TournamentMatch {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TournamentMatch.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 1 }),
    __metadata("design:type", Number)
], TournamentMatch.prototype, "round", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 1 }),
    __metadata("design:type", Number)
], TournamentMatch.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)({ enum: bestOfType_enum_1.BestOfTypeEnum, default: bestOfType_enum_1.BestOfTypeEnum.BO3 }),
    __metadata("design:type", Number)
], TournamentMatch.prototype, "bestOfType", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], TournamentMatch.prototype, "isOver", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => teams_entity_1.Team, team => team.sideA, { eager: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", teams_entity_1.Team)
], TournamentMatch.prototype, "teamA", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], TournamentMatch.prototype, "teamAWins", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => teams_entity_1.Team, team => team.sideB, { eager: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", teams_entity_1.Team)
], TournamentMatch.prototype, "teamB", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], TournamentMatch.prototype, "teamBWins", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => teams_entity_1.Team, team => team.matchesWon, { eager: true, nullable: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", teams_entity_1.Team)
], TournamentMatch.prototype, "winner", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tournaments_entity_1.Tournament, tournament => tournament.matches),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", tournaments_entity_1.Tournament)
], TournamentMatch.prototype, "tournament", void 0);
TournamentMatch = __decorate([
    (0, typeorm_1.Entity)()
], TournamentMatch);
exports.TournamentMatch = TournamentMatch;
//# sourceMappingURL=tournamentMatch.entity.js.map