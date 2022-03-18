import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamsModule } from './teams/teams.module';
import { TournamentsModule } from './tournaments/tournaments.module';
import { PlayersModule } from './players/players.module';
import { AuthModule } from './auth/auth.module';
import { LocalStrategy } from './auth/strategy/local.strategy';
import { TeamInvitationModule } from './team-invitation/team-invitation.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal : true }),
    TypeOrmModule.forRoot({ 
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [
        'players/models/player/player.entity.ts',
        'players/models/profile/profile.entity.ts',
        'teams/models/teams.entity.ts',
        'team-invitation/models/teamInvitation.entity.ts',
        'tournaments/models/tournaments.entity.ts',
        'tournaments/models/tournamentMatch.entity.ts',

      ],
      autoLoadEntities: true,
      synchronize: true,  // ! can't be used in production.
      logging: 'all'

    }),
    PlayersModule,
    TeamsModule,
    TournamentsModule,
    AuthModule,
    TeamInvitationModule

  ],
  controllers: [AppController],
  providers: [AppService, LocalStrategy,],
  
})
export class AppModule {

  
}
