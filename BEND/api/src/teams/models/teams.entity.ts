import { Player } from "src/players/models/players.entity";
import { Tournament } from "src/tournaments/models/tournaments.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Team {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true})
    teamName: string;

    @Column({length: 3})
    abbreviation: string;

    @Column({nullable: true})
    logo: string;

    @OneToMany(() => Player, player => player.team, {cascade: true})
    players: Player[];

    @ManyToOne(() => Tournament, tournament => tournament.teams)
    tournament: Tournament;

  


    

}  