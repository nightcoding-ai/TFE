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
exports.PlayersController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const fs_1 = require("fs");
const multer_1 = require("multer");
const path_1 = require("path");
const jwt_auth_guard_1 = require("../../../auth/guards/jwt-auth.guard");
const createPlayerDTO_1 = require("../../DTO/player/createPlayerDTO");
const player_service_1 = require("../../providers/player/player.service");
const fs = require('fs');
let PlayersController = class PlayersController {
    constructor(PlayersService) {
        this.PlayersService = PlayersService;
    }
    create(player) {
        return this.PlayersService.createAPlayer(player);
    }
    getFile(pp) {
        const file = (0, fs_1.createReadStream)((0, path_1.join)(process.cwd(), `assets/${pp}`));
        return new common_1.StreamableFile(file);
    }
    deleteFile(filename) {
        const path = `./images/${filename}`;
        try {
            fs.unlink(path, () => console.log('OK'));
        }
        catch (err) {
            throw err;
        }
    }
    uploadSingle(file) {
        if (!file) {
            throw new common_1.BadRequestException('File is not an image');
        }
        else {
            const response = {
                filePath: `http://localhost:3000/api/players/images/${file.filename}`
            };
            return response;
        }
    }
    async getPicture(filename, res) {
        res.sendFile(filename, { root: './images' });
    }
    getMyProfileInformations(req) {
        return this.PlayersService.myProfile(req.user.playerID);
    }
    getOne(idPlayer) {
        return this.PlayersService.getOne(idPlayer);
    }
    getAll() {
        return this.PlayersService.getAllPlayers();
    }
    getAllFree() {
        return this.PlayersService.getAllFree();
    }
    getNumberOfPlayer() {
        return this.PlayersService.getNumberOfPlayer();
    }
    getAllByRoleAndFree(req) {
        return this.PlayersService.getAllByRoleAndFree(req.body.role);
    }
    updateProfile(id, req) {
        return this.PlayersService.updatePlayerProfile(req.user.playerID, id, req.body);
    }
    updatePlayer(id, req) {
        return this.PlayersService.updatePlayer(req.user.playerID, id, req.body);
    }
    leaveTeam(req) {
        return this.PlayersService.leaveTeam(req.user.playerID);
    }
    delete(idPlayer, req) {
        return this.PlayersService.delete(req.user.playerID, idPlayer);
    }
    deleteProfilePicture(req) {
        return this.PlayersService.deleteProfilePicture(req.user.playerID);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createPlayerDTO_1.CreatePlayerDTO]),
    __metadata("design:returntype", Promise)
], PlayersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("stream/:pp"),
    __param(0, (0, common_1.Param)('pp')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", common_1.StreamableFile)
], PlayersController.prototype, "getFile", null);
__decorate([
    (0, common_1.Delete)('images/:filename'),
    __param(0, (0, common_1.Param)('filename')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PlayersController.prototype, "deleteFile", null);
__decorate([
    (0, common_1.Post)("upload"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("picture", {
        storage: (0, multer_1.diskStorage)({
            destination: "./images",
            filename: async (req, file, cb) => {
                const name = await file.originalname.split(".")[0];
                const fileExtension = await file.originalname.split(".")[1];
                const newFileName = name.split(" ").join("_") + "_" + Date.now() + "." + fileExtension;
                cb(null, newFileName);
            }
        }),
        fileFilter: (req, file, cb) => {
            const ext = file.mimetype;
            const validExtensions = ["image/jpg", "image/png", "image/jpeg", "image/svg"];
            if (!validExtensions.find(e => e === ext)) {
                return cb(new Error('Extension not allowed'), false);
            }
            return cb(null, true);
        }
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PlayersController.prototype, "uploadSingle", null);
__decorate([
    (0, common_1.Get)('images/:filename'),
    __param(0, (0, common_1.Param)('filename')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PlayersController.prototype, "getPicture", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('my_profile'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PlayersController.prototype, "getMyProfileInformations", null);
__decorate([
    (0, common_1.Get)('single/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PlayersController.prototype, "getOne", null);
__decorate([
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PlayersController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('free'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PlayersController.prototype, "getAllFree", null);
__decorate([
    (0, common_1.Get)('count_players'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PlayersController.prototype, "getNumberOfPlayer", null);
__decorate([
    (0, common_1.Post)('all_by_role'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PlayersController.prototype, "getAllByRoleAndFree", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)(':id/update/profile'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PlayersController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)(':id/update'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PlayersController.prototype, "updatePlayer", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('leave_team'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PlayersController.prototype, "leaveTeam", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PlayersController.prototype, "delete", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('profile_picture'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PlayersController.prototype, "deleteProfilePicture", null);
PlayersController = __decorate([
    (0, common_1.Controller)('players'),
    __metadata("design:paramtypes", [player_service_1.PlayersService])
], PlayersController);
exports.PlayersController = PlayersController;
//# sourceMappingURL=player.controller.js.map