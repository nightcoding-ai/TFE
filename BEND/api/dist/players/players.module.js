"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const joinRequest_entity_1 = require("../join-request/models/joinRequest.entity");
const teamInvitation_entity_1 = require("../team-invitation/models/teamInvitation.entity");
const teams_entity_1 = require("../teams/models/teams.entity");
const tournament_repository_1 = require("../tournaments/repositories/tournament.repository");
const tournamentMatch_repositoy_1 = require("../tournaments/repositories/tournamentMatch.repositoy");
const tournamentParticipation_repository_1 = require("../tournaments/repositories/tournamentParticipation.repository");
const player_controller_1 = require("./controllers/player/player.controller");
const player_entity_1 = require("./models/player/player.entity");
const profile_entity_1 = require("./models/profile/profile.entity");
const player_service_1 = require("./providers/player/player.service");
const player_repository_1 = require("./repository/player/player.repository");
const profile_repository_1 = require("./repository/profil/profile.repository");
let PlayersModule = class PlayersModule {
};
PlayersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                player_repository_1.PlayerRepository,
                player_entity_1.Player,
                teams_entity_1.Team,
                profile_entity_1.Profile,
                teamInvitation_entity_1.TeamInvitation,
                joinRequest_entity_1.JoinRequest,
            ]),
        ],
        controllers: [
            player_controller_1.PlayersController
        ],
        providers: [
            player_service_1.PlayersService,
            player_repository_1.PlayerRepository,
            profile_repository_1.ProfileRepository,
            tournamentParticipation_repository_1.TournamentParticipationRepository,
            tournamentMatch_repositoy_1.TournamentMatchRepository,
            tournament_repository_1.TournamentRepository,
        ],
        exports: [player_service_1.PlayersService]
    })
], PlayersModule);
exports.PlayersModule = PlayersModule;
//# sourceMappingURL=players.module.js.map