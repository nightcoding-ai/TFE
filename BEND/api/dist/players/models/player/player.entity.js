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
exports.Player = void 0;
const typeorm_1 = require("typeorm");
const joinRequest_entity_1 = require("../../../join-request/models/joinRequest.entity");
const teamInvitation_entity_1 = require("../../../team-invitation/models/teamInvitation.entity");
const teams_entity_1 = require("../../../teams/models/teams.entity");
const userType_enum_1 = require("../../enum/userType.enum");
const profile_entity_1 = require("../profile/profile.entity");
let Player = class Player {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Player.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 40, unique: true }),
    __metadata("design:type", String)
], Player.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ enum: userType_enum_1.UserType, default: userType_enum_1.UserType.USER }),
    __metadata("design:type", String)
], Player.prototype, "userType", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => profile_entity_1.Profile, profile => profile.player, { onDelete: 'CASCADE', cascade: true, eager: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", profile_entity_1.Profile)
], Player.prototype, "profile", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => teams_entity_1.Team, team => team.players, { nullable: true }),
    __metadata("design:type", teams_entity_1.Team)
], Player.prototype, "team", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => teamInvitation_entity_1.TeamInvitation, teamInvitation => teamInvitation.player, { nullable: true }),
    __metadata("design:type", Array)
], Player.prototype, "invitations", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => joinRequest_entity_1.JoinRequest, joinRequest => joinRequest.player, { nullable: true }),
    __metadata("design:type", Array)
], Player.prototype, "joinRequests", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Player.prototype, "deletedAt", void 0);
Player = __decorate([
    (0, typeorm_1.Entity)()
], Player);
exports.Player = Player;
//# sourceMappingURL=player.entity.js.map