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
exports.JoinRequestService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const userType_enum_1 = require("../../players/enum/userType.enum");
const player_repository_1 = require("../../players/repository/player/player.repository");
const teams_repository_1 = require("../../teams/repository/teams.repository");
const joinRequestDTO_1 = require("../DTO/joinRequestDTO");
const joinRequest_repository_1 = require("../repositories/joinRequest.repository");
let JoinRequestService = class JoinRequestService {
    constructor(JoinRequestRepository, PlayerRepository, TeamRepository) {
        this.JoinRequestRepository = JoinRequestRepository;
        this.PlayerRepository = PlayerRepository;
        this.TeamRepository = TeamRepository;
    }
    async createOne(idPlayer, joinRequest) {
        try {
            const player = await this.PlayerRepository.getOne(idPlayer);
            const teamToJoin = await this.TeamRepository.getTeam(joinRequest.team);
            const requestToTeam = await this.JoinRequestRepository.getRequestToTeam(player.id, teamToJoin.id);
            if (player.id !== joinRequest.player || player.team || player.profile.isCaptain || !teamToJoin || teamToJoin.players.length >= 5 || teamToJoin.players.find((plr) => plr.profile.role === player.profile.role) || requestToTeam.length > 0) {
                throw new common_1.UnauthorizedException();
            }
            else {
                return await this.JoinRequestRepository.createOne(joinRequest);
            }
        }
        catch (err) {
            throw err;
        }
    }
    async acceptRequest(idCaptain, idRequest) {
        try {
            const captain = await this.PlayerRepository.getOne(idCaptain);
            const request = await this.JoinRequestRepository.getOne(idRequest);
            const team = captain.team;
            const playerAsker = await this.PlayerRepository.getOne(request.player.id);
            if (!captain || !captain.team || !captain.profile.isCaptain || playerAsker.team || team.players.length > 4) {
                throw new common_1.UnauthorizedException();
            }
            request.isApproved = true;
            playerAsker.team = team;
            await this.JoinRequestRepository.saveRequest(request);
            await this.PlayerRepository.savePlayer(playerAsker);
            if (team.players.length === 4) {
                return await this.JoinRequestRepository.deleteAllOfATeam(team.id);
            }
            else {
                return await this.JoinRequestRepository.deleteAllOfATeamByRole(playerAsker.profile.role, captain.team);
            }
        }
        catch (err) {
            throw err;
        }
    }
    async getAll(adminId) {
        try {
            const result = await this.JoinRequestRepository.getAll();
            const admin = await this.PlayerRepository.getOne(adminId);
            if (admin.userType !== userType_enum_1.UserType.ADMIN) {
                return new common_1.UnauthorizedException();
            }
            if (!result) {
                return null;
            }
            let dtoArray = [];
            for (const req of result) {
                let dto = new joinRequestDTO_1.JoinRequestDTO();
                dto.id = req.id;
                dto.playerId = req.player.id;
                dto.playerName = req.player.name;
                if (req.player.profile.profilPicture) {
                    dto.playerProfilePicture = req.player.profile.profilPicture;
                }
                dto.role = req.role;
                dto.isApproved = req.isApproved;
                dto.createdAt = req.createdAt;
                dto.expiredAt = req.expiredAt;
                dtoArray.push(dto);
            }
            return dtoArray;
        }
        catch (err) {
            throw err;
        }
    }
    async getAllOfAPlayer(idPlayer) {
        try {
            const result = await this.JoinRequestRepository.getAllOfAPlayer(idPlayer);
            if (!result) {
                return null;
            }
            return result;
        }
        catch (err) {
            throw err;
        }
    }
    async getAllOfTeam(idCaptain, idTeam) {
        try {
            const captain = await this.PlayerRepository.getOne(idCaptain);
            if (!captain || !captain.profile.isCaptain || !captain.team || captain.team.id !== idTeam) {
                return new common_1.UnauthorizedException();
            }
            const result = await this.JoinRequestRepository.getAllOfATeam(idTeam);
            const dtoArray = [];
            if (!result) {
                return null;
            }
            for (const req of result) {
                let dto = new joinRequestDTO_1.JoinRequestDTO();
                dto.id = req.id;
                dto.playerId = req.player.id;
                dto.playerName = req.player.name;
                dto.playerRank = req.player.profile.rank;
                dto.playerRole = req.player.profile.role;
                dto.playerDiscord = req.player.profile.discord;
                dto.playerIGN = req.player.profile.inGameName;
                if (req.player.profile.profilPicture) {
                    dto.playerProfilePicture = req.player.profile.profilPicture;
                }
                dto.teamId = req.team.id;
                dto.role = req.role;
                dto.isApproved = req.isApproved;
                dto.createdAt = req.createdAt;
                dto.expiredAt = req.expiredAt;
                dtoArray.push(dto);
            }
            return dtoArray;
        }
        catch (err) {
            throw err;
        }
    }
    async getAllExpiredRequests(adminId) {
        try {
            const admin = await this.PlayerRepository.getOne(adminId);
            if (admin.userType !== userType_enum_1.UserType.ADMIN) {
                return new common_1.UnauthorizedException();
            }
            return await this.JoinRequestRepository.getAllWithExpiredRequests();
        }
        catch (err) {
            throw err;
        }
    }
    async deleteOne(idPlayer, idJoinRequest) {
        try {
            const captain = await this.PlayerRepository.getOne(idPlayer);
            const req = await this.JoinRequestRepository.getOne(idJoinRequest);
            if (!req) {
                return null;
            }
            if (!captain.profile.isCaptain || !req || req.team.id !== captain.team.id) {
                return new common_1.UnauthorizedException();
            }
            return await this.JoinRequestRepository.deleteOne(idJoinRequest);
        }
        catch (err) {
            throw err;
        }
    }
    async deleteAllOfAPlayer(idPlayer) {
        try {
            return await this.JoinRequestRepository.deleteAllOfAPlayer(idPlayer);
        }
        catch (err) {
            throw err;
        }
    }
    async deleteAllOfATeam(idTeam) {
        try {
            return await this.JoinRequestRepository.deleteAllOfATeam(idTeam);
        }
        catch (err) {
            throw err;
        }
    }
    async deleteAllOfATeamByRole(role, team) {
        try {
            return await this.JoinRequestRepository.deleteAllOfATeamByRole(role, team);
        }
        catch (err) {
            throw err;
        }
    }
    async deleteAllExpiredRequests() {
        try {
            return await this.JoinRequestRepository.deleteAllExpiredRequests();
        }
        catch (err) {
            throw err;
        }
    }
};
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_12_HOURS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], JoinRequestService.prototype, "deleteAllExpiredRequests", null);
JoinRequestService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [joinRequest_repository_1.JoinRequestRepository,
        player_repository_1.PlayerRepository,
        teams_repository_1.TeamRepository])
], JoinRequestService);
exports.JoinRequestService = JoinRequestService;
//# sourceMappingURL=joinRequest.service.js.map