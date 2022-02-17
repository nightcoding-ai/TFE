import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from 'src/players/models/players.entity';
import { Rank } from './models/ranks.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Rank, Player])
    ],
    controllers: [

    ],
    providers: [

    ],
    exports: [

    ]

})
export class RanksModule {}
