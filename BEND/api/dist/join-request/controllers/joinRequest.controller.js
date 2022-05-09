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
exports.JoinRequestController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const joinRequest_service_1 = require("../providers/joinRequest.service");
let JoinRequestController = class JoinRequestController {
    constructor(JoinRequestService) {
        this.JoinRequestService = JoinRequestService;
    }
    create(req) {
        console.log(req.user.playerID, req.body);
        return this.JoinRequestService.createOne(req.user.playerID, req.body);
    }
    acceptRequest(req) {
        return this.JoinRequestService.acceptRequest(req.user.playerID, req.body.joinRequestId);
    }
    getAllRequests(req) {
        return this.JoinRequestService.getAll(req.user.playerID);
    }
    getAllExpiredRequests(req) {
        return this.JoinRequestService.getAllExpiredRequests(req.user.playerID);
    }
    getAllOfAPlayer(req) {
        return this.JoinRequestService.getAllOfAPlayer(req.user.playerID);
    }
    getAllOfATeam(req) {
        return this.JoinRequestService.getAllOfTeam(req.user.playerID, req.body.teamId);
    }
    refuseRequest(id, req) {
        return this.JoinRequestService.deleteOne(req.user.playerID, id);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], JoinRequestController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('accept'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], JoinRequestController.prototype, "acceptRequest", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('all'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], JoinRequestController.prototype, "getAllRequests", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('all/expired'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], JoinRequestController.prototype, "getAllExpiredRequests", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('mine'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], JoinRequestController.prototype, "getAllOfAPlayer", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('team'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], JoinRequestController.prototype, "getAllOfATeam", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('refuse/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], JoinRequestController.prototype, "refuseRequest", null);
JoinRequestController = __decorate([
    (0, common_1.Controller)('joinrequests'),
    __metadata("design:paramtypes", [joinRequest_service_1.JoinRequestService])
], JoinRequestController);
exports.JoinRequestController = JoinRequestController;
//# sourceMappingURL=joinRequest.controller.js.map