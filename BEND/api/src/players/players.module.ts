import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JoinRequest } from 'src/join-request/models/joinRequest.entity';
import { JoinRequestRepository } from 'src/join-request/repositories/joinRequest.repository';
import { TeamInvitation } from 'src/team-invitation/models/teamInvitation.entity';
import { Team } from 'src/teams/models/teams.entity';
import { PlayersController } from './controllers/player/player.controller';
import { Player } from './models/player/player.entity';
import { Profile } from './models/profile/profile.entity';
import { PlayersService } from './providers/player/player.service';
import { PlayerRepository } from './repository/player/player.repository';
import { ProfileRepository } from './repository/profil/profile.repository';




@Module({
    imports: [
        TypeOrmModule.forFeature([
            Player, 
            Team, 
            Profile,
            TeamInvitation,
            JoinRequest,]),
    ],
    controllers: [
        PlayersController
    ],
    providers: [
        PlayersService,
        PlayerRepository,
        ProfileRepository,
        
    ],
    exports: [PlayersService]
    

})
export class PlayersModule {

}
