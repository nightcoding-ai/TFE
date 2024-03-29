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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const player_service_1 = require("../players/providers/player/player.service");
const jwt_1 = require("@nestjs/jwt");
const argon2 = require('argon2');
let AuthService = class AuthService {
    constructor(playersService, jwtService) {
        this.playersService = playersService;
        this.jwtService = jwtService;
    }
    async validatePlayer(name, pass) {
        const player = await this.playersService.getOneByName(name);
        if (player && (await argon2.verify(player.profile.password, pass))) {
            return player;
        }
        return null;
    }
    async login(dto) {
        const player = await this.validatePlayer(dto.name, dto.password);
        if (!player) {
            throw new common_1.UnauthorizedException();
        }
        const payload = { id: player.id };
        return { acces_token: this.jwtService.sign(payload) };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [player_service_1.PlayersService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map