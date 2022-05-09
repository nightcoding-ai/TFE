"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TournamentsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const player_entity_1 = require("../players/models/player/player.entity");
const player_repository_1 = require("../players/repository/player/player.repository");
const teams_entity_1 = require("../teams/models/teams.entity");
const teams_repository_1 = require("../teams/repository/teams.repository");
const tournament_controller_1 = require("./controllers/tournament.controller");
const tournamentMatch_entity_1 = require("./models/tournamentMatch.entity");
const tournamentParticipation_entity_1 = require("./models/tournamentParticipation.entity");
const tournaments_entity_1 = require("./models/tournaments.entity");
const tournament_service_1 = require("./providers/tournament.service");
const tournament_repository_1 = require("./repositories/tournament.repository");
const tournamentMatch_repositoy_1 = require("./repositories/tournamentMatch.repositoy");
const tournamentParticipation_repository_1 = require("./repositories/tournamentParticipation.repository");
let TournamentsModule = class TournamentsModule {
};
TournamentsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                player_entity_1.Player,
                teams_entity_1.Team,
                tournaments_entity_1.Tournament,
                tournamentMatch_entity_1.TournamentMatch,
                tournamentParticipation_entity_1.TournamentParticipation
            ])
        ],
        controllers: [
            tournament_controller_1.TournamentsController
        ],
        providers: [
            tournament_service_1.TournamentService,
            player_repository_1.PlayerRepository,
            teams_repository_1.TeamRepository,
            tournament_repository_1.TournamentRepository,
            tournamentParticipation_repository_1.TournamentParticipationRepository,
            tournamentMatch_repositoy_1.TournamentMatchRepository
        ],
        exports: [tournament_service_1.TournamentService]
    })
], TournamentsModule);
exports.TournamentsModule = TournamentsModule;
//# sourceMappingURL=tournaments.module.js.map