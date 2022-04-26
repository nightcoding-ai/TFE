import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamInvitationController } from './controllers/teamInvitation.controller';
import { JoinRequest } from '../join-request/models/joinRequest.entity';
import { TeamInvitation } from './models/teamInvitation.entity';
import { TeamInvitationService } from './providers/teamInvitation.service';
import { TeamInvitationRepository } from './repositories/teamInvitation.repository';
import { Team } from '../teams/models/teams.entity';
import { Player } from '../players/models/player/player.entity';
import { PlayerRepository } from '../players/repository/player/player.repository';
import { TeamRepository } from '../teams/repository/teams.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Team, 
            Player, 
            TeamInvitation, 
            JoinRequest,
        ])
    ],
    controllers: [
        TeamInvitationController,
    ],
    providers: [
        TeamInvitationRepository,
        PlayerRepository,
        TeamRepository,
        TeamInvitationService,   
    ],
    exports: [
        TeamInvitationService,
    ]
})

export class TeamInvitationModule {}
