import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from 'src/players/models/player/player.entity';
import { Profile } from 'src/players/models/profile/profile.entity';
import { PlayerRepository } from 'src/players/repository/player/player.repository';
import { Team } from 'src/teams/models/teams.entity';
import { TeamRepository } from 'src/teams/repository/teams.repository';
import { TeamInvitationController } from './controllers/teamInvitation.controller';
import { JoinRequest } from '../join-request/models/joinRequest.entity';
import { TeamInvitation } from './models/teamInvitation.entity';
import { TeamInvitationService } from './providers/teamInvitation.service';
import { TeamInvitationRepository } from './repositories/teamInvitation.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([Team, Player, TeamInvitation, JoinRequest]),
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
