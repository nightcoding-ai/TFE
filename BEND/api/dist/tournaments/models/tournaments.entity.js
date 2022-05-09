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
exports.Tournament = void 0;
const typeorm_1 = require("typeorm");
const teams_entity_1 = require("../../teams/models/teams.entity");
const seed_enum_1 = require("../enum/seed.enum");
const tournamentMatch_entity_1 = require("./tournamentMatch.entity");
const tournamentParticipation_entity_1 = require("./tournamentParticipation.entity");
let Tournament = class Tournament {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Tournament.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Tournament.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: seed_enum_1.SeedEnum.SEED8, enum: seed_enum_1.SeedEnum }),
    __metadata("design:type", Number)
], Tournament.prototype, "seed", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Tournament.prototype, "areInscriptionsClosed", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: new Date() }),
    __metadata("design:type", Date)
], Tournament.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", Date)
], Tournament.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => tournamentParticipation_entity_1.TournamentParticipation, tournamentParticipation => tournamentParticipation.tournament),
    __metadata("design:type", Array)
], Tournament.prototype, "participants", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => tournamentMatch_entity_1.TournamentMatch, tournamentMatch => tournamentMatch.tournament),
    __metadata("design:type", Array)
], Tournament.prototype, "matches", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => teams_entity_1.Team, team => team.tournamentWins),
    __metadata("design:type", teams_entity_1.Team)
], Tournament.prototype, "winner", void 0);
Tournament = __decorate([
    (0, typeorm_1.Entity)()
], Tournament);
exports.Tournament = Tournament;
//# sourceMappingURL=tournaments.entity.js.map