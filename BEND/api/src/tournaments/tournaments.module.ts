import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from '../players/models/player/player.entity';
import { PlayerRepository } from '../players/repository/player/player.repository';
import { Team } from '../teams/models/teams.entity';
import { TeamRepository } from '../teams/repository/teams.repository';
import { TournamentsController } from './controllers/tournament.controller';
import { TournamentMatch } from './models/tournamentMatch.entity';
import { TournamentParticipation } from './models/tournamentParticipation.entity';
import { Tournament } from './models/tournaments.entity';
import { TournamentService } from './providers/tournament.service';
import { TournamentRepository } from './repositories/tournament.repository';
import { TournamentMatchRepository } from './repositories/tournamentMatch.repositoy';
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
        TournamentParticipationRepository,
        TournamentMatchRepository
    ],
    exports: [TournamentService]
})
export class TournamentsModule {}
