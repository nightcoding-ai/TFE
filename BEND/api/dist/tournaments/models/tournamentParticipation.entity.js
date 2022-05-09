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
exports.TournamentParticipation = void 0;
const typeorm_1 = require("typeorm");
const teams_entity_1 = require("../../teams/models/teams.entity");
const tournaments_entity_1 = require("./tournaments.entity");
let TournamentParticipation = class TournamentParticipation {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TournamentParticipation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tournaments_entity_1.Tournament, tournament => tournament.participants, { eager: true, cascade: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", tournaments_entity_1.Tournament)
], TournamentParticipation.prototype, "tournament", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => teams_entity_1.Team, team => team.tournamentParticipations, { eager: true, cascade: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", teams_entity_1.Team)
], TournamentParticipation.prototype, "team", void 0);
TournamentParticipation = __decorate([
    (0, typeorm_1.Entity)()
], TournamentParticipation);
exports.TournamentParticipation = TournamentParticipation;
//# sourceMappingURL=tournamentParticipation.entity.js.map