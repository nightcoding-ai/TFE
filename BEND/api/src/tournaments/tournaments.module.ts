import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JoinRequest } from 'src/join-request/models/joinRequest.entity';
import { Player } from 'src/players/models/player/player.entity';
import { Profile } from 'src/players/models/profile/profile.entity';
import { PlayerRepository } from 'src/players/repository/player/player.repository';
import { TeamInvitation } from 'src/team-invitation/models/teamInvitation.entity';
import { Team } from 'src/teams/models/teams.entity';
import { TeamRepository } from 'src/teams/repository/teams.repository';
import { TournamentsController } from './controllers/tournament.controller';
import { TournamentMatch } from './models/tournamentMatch.entity';
import { TournamentParticipation } from './models/tournamentParticipation.entity';
import { Tournament } from './models/tournaments.entity';
import { TournamentService } from './providers/tournament.service';
import { TournamentRepository } from './repositories/tournament.repository';
import { TournamentParticipationRepository } from './repositories/tournamentParticipation.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Player, 
            Team, 
            Tournament,
            TournamentMatch,
            TournamentParticipation
        ])
    ],
    controllers: [
        TournamentsController
    ],
    providers: [
        TournamentService,
        PlayerRepository,
        TeamRepository,
        TournamentRepository,
        TournamentParticipationRepository      
    ],
    exports: [TournamentService]
})
export class TournamentsModule {}
