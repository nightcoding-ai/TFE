"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const joinRequest_entity_1 = require("../join-request/models/joinRequest.entity");
const player_entity_1 = require("../players/models/player/player.entity");
const profile_entity_1 = require("../players/models/profile/profile.entity");
const player_repository_1 = require("../players/repository/player/player.repository");
const profile_repository_1 = require("../players/repository/profil/profile.repository");
const teamInvitation_entity_1 = require("../team-invitation/models/teamInvitation.entity");
const tournamentMatch_entity_1 = require("../tournaments/models/tournamentMatch.entity");
const tournamentParticipation_entity_1 = require("../tournaments/models/tournamentParticipation.entity");
const tournaments_entity_1 = require("../tournaments/models/tournaments.entity");
const tournament_repository_1 = require("../tournaments/repositories/tournament.repository");
const tournamentMatch_repositoy_1 = require("../tournaments/repositories/tournamentMatch.repositoy");
const tournamentParticipation_repository_1 = require("../tournaments/repositories/tournamentParticipation.repository");
const teams_controller_1 = require("./controllers/teams.controller");
const teams_entity_1 = require("./models/teams.entity");
const teams_service_1 = require("./providers/teams.service");
const teams_repository_1 = require("./repository/teams.repository");
let TeamsModule = class TeamsModule {
};
TeamsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([teams_entity_1.Team,
                tournaments_entity_1.Tournament,
                player_entity_1.Player,
                profile_entity_1.Profile,
                teamInvitation_entity_1.TeamInvitation,
                tournamentMatch_entity_1.TournamentMatch,
                tournamentParticipation_entity_1.TournamentParticipation,
                tournaments_entity_1.Tournament,
                joinRequest_entity_1.JoinRequest
            ]),
        ],
        controllers: [
            teams_controller_1.TeamsController
        ],
        providers: [
            teams_service_1.TeamsService,
            teams_repository_1.TeamRepository,
            player_repository_1.PlayerRepository,
            profile_repository_1.ProfileRepository,
            tournament_repository_1.TournamentRepository,
            tournamentParticipation_repository_1.TournamentParticipationRepository,
            tournamentMatch_repositoy_1.TournamentMatchRepository
        ],
        exports: []
    })
], TeamsModule);
exports.TeamsModule = TeamsModule;
//# sourceMappingURL=teams.module.js.map