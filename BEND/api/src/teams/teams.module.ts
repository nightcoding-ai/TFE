import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JoinRequest } from '../join-request/models/joinRequest.entity';
import { Player } from '../players/models/player/player.entity';
import { Profile } from '../players/models/profile/profile.entity';
import { PlayerRepository } from '../players/repository/player/player.repository';
import { ProfileRepository } from '../players/repository/profil/profile.repository';
import { TeamInvitation } from '../team-invitation/models/teamInvitation.entity';
import { TournamentMatch } from '../tournaments/models/tournamentMatch.entity';
import { TournamentParticipation } from '../tournaments/models/tournamentParticipation.entity';
import { Tournament } from '../tournaments/models/tournaments.entity';
import { TournamentRepository } from '../tournaments/repositories/tournament.repository';
import { TournamentMatchRepository } from '../tournaments/repositories/tournamentMatch.repositoy';
import { TournamentParticipationRepository } from '../tournaments/repositories/tournamentParticipation.repository';
import { TeamsController } from './controllers/teams.controller';
import { Team } from './models/teams.entity';
import { TeamsService } from './providers/teams.service';
import { TeamRepository } from './repository/teams.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([Team,
            Tournament,
            Player, 
            Profile, 
            TeamInvitation, 
            TournamentMatch, 
            TournamentParticipation,
            Tournament, 
            JoinRequest
        ]),
    ],
    controllers: [
        TeamsController
        
    ],
    providers: [
        TeamsService,
        TeamRepository,
        PlayerRepository,
        ProfileRepository,
        TournamentRepository,
        TournamentParticipationRepository,
        TournamentMatchRepository

        
    ],
    exports: [
        
    ]
})
export class TeamsModule {
    
}
