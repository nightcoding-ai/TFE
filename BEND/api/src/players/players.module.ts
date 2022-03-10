import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from 'src/teams/models/teams.entity';
import { PlayersController } from './controllers/player/player.controller';
import { Player } from './models/player/player.entity';
import { Profile } from './models/profile/profil.entity';
import { PlayersService } from './providers/player/player.service';
import { PlayerRepository } from './repository/player/player.repository';
import { ProfileRepository } from './repository/profil/profil.repository';




@Module({
    imports: [
        TypeOrmModule.forFeature([
            Player, 
            Team, 
            Profile]),
    ],
    controllers: [
        PlayersController
    ],
    providers: [
        PlayersService,
        PlayerRepository,
        ProfileRepository
        
    ],
    exports: [PlayersService]
    

})
export class PlayersModule {

}
