import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from '../players/models/player/player.entity';
import { PlayerRepository } from '../players/repository/player/player.repository';
import { TeamInvitation } from '../team-invitation/models/teamInvitation.entity';
import { TeamInvitationRepository } from '../team-invitation/repositories/teamInvitation.repository';
import { Team } from '../teams/models/teams.entity';
import { TeamRepository } from '../teams/repository/teams.repository';
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
