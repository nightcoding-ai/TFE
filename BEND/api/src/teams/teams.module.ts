import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from 'src/players/models/player/player.entity';
import { Profile } from 'src/players/models/profile/profile.entity';
import { PlayerRepository } from 'src/players/repository/player/player.repository';
import { ProfileRepository } from 'src/players/repository/profil/profile.repository';
import { TeamInvitation } from 'src/team-invitation/models/teamInvitation';
import { TournamentMatch } from 'src/tournaments/models/tournamentMatch.entity';
import { Tournament } from 'src/tournaments/models/tournaments.entity';
import { TeamsController } from './controllers/teams.controller';
import { Team } from './models/teams.entity';
import { TeamsService } from './providers/teams.service';
import { TeamRepository } from './repository/teams.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([Team, Tournament,Player, Profile, TeamInvitation, TournamentMatch]),
    ],
    controllers: [
        TeamsController
        
    ],
    providers: [
        TeamsService,
        TeamRepository,
        PlayerRepository,
        ProfileRepository

        
    ],
    exports: [
        
    ]
})
export class TeamsModule {
    
}
