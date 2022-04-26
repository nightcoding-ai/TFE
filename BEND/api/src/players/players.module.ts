import { Module } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { JoinRequest } from '../join-request/models/joinRequest.entity';
import { TeamInvitation } from '../team-invitation/models/teamInvitation.entity';
import { Team } from '../teams/models/teams.entity';
import { TournamentRepository } from '../tournaments/repositories/tournament.repository';
import { TournamentMatchRepository } from '../tournaments/repositories/tournamentMatch.repositoy';
import { TournamentParticipationRepository } from '../tournaments/repositories/tournamentParticipation.repository';
import { PlayersController } from './controllers/player/player.controller';
import { Player } from './models/player/player.entity';
import { Profile } from './models/profile/profile.entity';
import { PlayersService } from './providers/player/player.service';
import { PlayerRepository } from './repository/player/player.repository';
import { ProfileRepository } from './repository/profil/profile.repository';




@Module({
    imports: [
        TypeOrmModule.forFeature([
            PlayerRepository,
            Player, 
            Team, 
            Profile,
            TeamInvitation,
            JoinRequest,
        ]),
    ],
    controllers: [
        PlayersController
    ],
    providers: [
        PlayersService,
        PlayerRepository,
        ProfileRepository,
        TournamentParticipationRepository,
        TournamentMatchRepository,
        TournamentRepository,
       
        
    ],
    exports: [PlayersService]
    

})
export class PlayersModule {

}
