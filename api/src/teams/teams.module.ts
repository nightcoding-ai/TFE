import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from 'src/players/models/players.entity';
import { Team } from './models/teams.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Team, Player]),
    ],
    controllers: [
        
    ],
    providers: [
        
    ],
    exports: [
        
    ]
})
export class TeamsModule {
    
}
