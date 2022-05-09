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
exports.Profile = void 0;
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const rank_enum_1 = require("../../enum/rank.enum");
const role_enum_1 = require("../../enum/role.enum");
const player_entity_1 = require("../player/player.entity");
let Profile = class Profile {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Profile.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, typeorm_1.Column)({ unique: true, nullable: false }),
    __metadata("design:type", String)
], Profile.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Profile.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "profilPicture", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "discord", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Profile.prototype, "inGameName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, enum: role_enum_1.RoleEnum }),
    __metadata("design:type", String)
], Profile.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, enum: rank_enum_1.RankEnum }),
    __metadata("design:type", String)
], Profile.prototype, "rank", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: false }),
    __metadata("design:type", Boolean)
], Profile.prototype, "isCaptain", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => player_entity_1.Player, player => player.profile),
    __metadata("design:type", player_entity_1.Player)
], Profile.prototype, "player", void 0);
Profile = __decorate([
    (0, typeorm_1.Entity)()
], Profile);
exports.Profile = Profile;
//# sourceMappingURL=profile.entity.js.map