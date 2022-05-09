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
exports.TeamInvitation = void 0;
const typeorm_1 = require("typeorm");
const role_enum_1 = require("../../players/enum/role.enum");
const player_entity_1 = require("../../players/models/player/player.entity");
const teams_entity_1 = require("../../teams/models/teams.entity");
const currentDate = new Date();
let TeamInvitation = class TeamInvitation {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TeamInvitation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => player_entity_1.Player, player => player.invitations, { eager: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", player_entity_1.Player)
], TeamInvitation.prototype, "player", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => teams_entity_1.Team, team => team.invitationToPlayer, { eager: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", teams_entity_1.Team)
], TeamInvitation.prototype, "team", void 0);
__decorate([
    (0, typeorm_1.Column)({ enum: role_enum_1.RoleEnum, nullable: false }),
    __metadata("design:type", String)
], TeamInvitation.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: false }),
    __metadata("design:type", Boolean)
], TeamInvitation.prototype, "isApproved", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', default: new Date() }),
    __metadata("design:type", Date)
], TeamInvitation.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', default: new Date(currentDate.setDate(currentDate.getDate() + 7)) }),
    __metadata("design:type", Date)
], TeamInvitation.prototype, "expiredAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], TeamInvitation.prototype, "deletedAt", void 0);
TeamInvitation = __decorate([
    (0, typeorm_1.Entity)()
], TeamInvitation);
exports.TeamInvitation = TeamInvitation;
//# sourceMappingURL=teamInvitation.entity.js.map