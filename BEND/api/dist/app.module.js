"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const teams_module_1 = require("./teams/teams.module");
const tournaments_module_1 = require("./tournaments/tournaments.module");
const players_module_1 = require("./players/players.module");
const auth_module_1 = require("./auth/auth.module");
const local_strategy_1 = require("./auth/strategy/local.strategy");
const team_invitation_module_1 = require("./team-invitation/team-invitation.module");
const join_request_module_1 = require("./join-request/join-request.module");
const schedule_1 = require("@nestjs/schedule");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.POSTGRES_HOST,
                port: parseInt(process.env.POSTGRES_PORT),
                username: process.env.POSTGRES_USER,
                password: process.env.POSTGRES_PASSWORD,
                database: process.env.POSTGRES_DATABASE,
                autoLoadEntities: true,
                synchronize: true,
            }),
            players_module_1.PlayersModule,
            teams_module_1.TeamsModule,
            tournaments_module_1.TournamentsModule,
            auth_module_1.AuthModule,
            team_invitation_module_1.TeamInvitationModule,
            join_request_module_1.JoinRequestModule,
            schedule_1.ScheduleModule.forRoot(),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, local_strategy_1.LocalStrategy],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map