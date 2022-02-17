import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rank } from 'src/ranks/models/ranks.entity';
import { Team } from 'src/teams/models/teams.entity';
import { PlayersController } from './controllers/players.controller';
import { Player } from './models/players.entity';
import { PlayersService } from './providers/players.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Player, Team, Rank]),
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
