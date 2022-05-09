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
import { JoinRequestModule } from './join-request/join-request.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal : true }),
    TypeOrmModule.forRoot({ 
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER, //ndls
      password: process.env.POSTGRES_PASSWORD, // 1234
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    PlayersModule,
    TeamsModule,
    TournamentsModule,
    AuthModule,
    TeamInvitationModule,
    JoinRequestModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, LocalStrategy],
  
})
export class AppModule {

  
}
