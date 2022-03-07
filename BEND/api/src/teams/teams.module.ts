import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from 'src/players/models/player/player.entity';
import { Profile } from 'src/players/models/profile/profil.entity';
import { Tournament } from 'src/tournaments/models/tournaments.entity';
import { TeamsController } from './controllers/teams.controller';
import { Team } from './models/teams.entity';
import { TeamsService } from './providers/teams.service';
import { TeamRepository } from './repository/teams.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([Team, Tournament,Player, Profile]),
    ],
    controllers: [
        TeamsController
        
    ],
    providers: [
        TeamsService,
        TeamRepository

        
    ],
    exports: [
        
    ]
})
export class TeamsModule {
    
}
