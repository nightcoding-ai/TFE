import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerInfo } from 'src/players/models/playerinfos.entity';
import { Player } from 'src/players/models/players.entity';
import { Tournament } from 'src/tournaments/models/tournaments.entity';
import { TeamsController } from './controllers/teams.controller';
import { Team } from './models/teams.entity';
import { TeamsService } from './providers/teams.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Team, Player, Tournament,PlayerInfo]),
    ],
    controllers: [
        TeamsController
        
    ],
    providers: [
        TeamsService
        
    ],
    exports: [
        
    ]
})
export class TeamsModule {
    
}
