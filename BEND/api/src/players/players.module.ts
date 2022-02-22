import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from 'src/teams/models/teams.entity';
import { PlayersController } from './controllers/players.controller';
import { PlayerInfo } from './models/playerinfos.entity';
import { Player } from './models/players.entity';
import { PlayersService } from './providers/players.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Player, Team, PlayerInfo]),
    ],
    controllers: [
        PlayersController
    ],
    providers: [
        PlayersService
    ],
    exports: [
        PlayersService
    ]

})
export class PlayersModule {}
