import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Player } from "src/players/models/players.entity";

@Entity()
export class Rank {
    @PrimaryGeneratedColumn()
    idRank: number;

    @Column()
    rankName: string;

   @OneToOne(() => Player, player => player.rank)
   player: Player;
    

}