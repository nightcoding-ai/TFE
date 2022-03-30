import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from 'src/players/models/player/player.entity';
import { PlayerRepository } from 'src/players/repository/player/player.repository';
import { TeamInvitationController } from 'src/team-invitation/controllers/teamInvitation.controller';
import { TeamInvitation } from 'src/team-invitation/models/teamInvitation.entity';
import { TeamInvitationRepository } from 'src/team-invitation/repositories/teamInvitation.repository';
import { Team } from 'src/teams/models/teams.entity';
import { TeamRepository } from 'src/teams/repository/teams.repository';
import { JoinRequestController } from './controllers/joinRequest.controller';
import { JoinRequest } from './models/joinRequest.entity';
import { JoinRequestService } from './providers/joinRequest.service';
import { JoinRequestRepository } from './repositories/joinRequest.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([Team, Player, TeamInvitation, JoinRequest]),
    ],
    controllers: [
        JoinRequestController

        
    ],
    providers: [
        TeamInvitationRepository,
        PlayerRepository,
        TeamRepository,
        JoinRequestRepository,
        JoinRequestService

        
    ],
    exports: [
        JoinRequestService,
    ]
})
export class JoinRequestModule {

}
