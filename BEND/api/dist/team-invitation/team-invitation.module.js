"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamInvitationModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const teamInvitation_controller_1 = require("./controllers/teamInvitation.controller");
const joinRequest_entity_1 = require("../join-request/models/joinRequest.entity");
const teamInvitation_entity_1 = require("./models/teamInvitation.entity");
const teamInvitation_service_1 = require("./providers/teamInvitation.service");
const teamInvitation_repository_1 = require("./repositories/teamInvitation.repository");
const teams_entity_1 = require("../teams/models/teams.entity");
const player_entity_1 = require("../players/models/player/player.entity");
const player_repository_1 = require("../players/repository/player/player.repository");
const teams_repository_1 = require("../teams/repository/teams.repository");
let TeamInvitationModule = class TeamInvitationModule {
};
TeamInvitationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                teams_entity_1.Team,
                player_entity_1.Player,
                teamInvitation_entity_1.TeamInvitation,
                joinRequest_entity_1.JoinRequest,
            ])
        ],
        controllers: [
            teamInvitation_controller_1.TeamInvitationController,
        ],
        providers: [
            teamInvitation_repository_1.TeamInvitationRepository,
            player_repository_1.PlayerRepository,
            teams_repository_1.TeamRepository,
            teamInvitation_service_1.TeamInvitationService,
        ],
        exports: [
            teamInvitation_service_1.TeamInvitationService,
        ]
    })
], TeamInvitationModule);
exports.TeamInvitationModule = TeamInvitationModule;
//# sourceMappingURL=team-invitation.module.js.map