import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Player } from "src/players/models/players.entity";

@Entity()
export class Team {
    @PrimaryGeneratedColumn()
    idTeam: number;

    @Column({unique:true})
    teamName: string;

    @Column({length: 3})
    abbreviation: string;

    @Column()
    image: string;

    @OneToMany(() => Player, player => player.team)
    players: Player[];

    

}