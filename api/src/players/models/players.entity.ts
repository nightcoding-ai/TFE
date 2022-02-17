import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Team } from "src/teams/models/teams.entity";
import { Rank } from "src/ranks/models/ranks.entity";

@Entity()
export class Player {
    @PrimaryGeneratedColumn()
    idPlayer: number;

    @Column({unique: true})
    nickname: string;

    @Column()
    password: string;

    @Column()
    discord: string;

    @Column()
    role: string;

    @Column()
    isCaptain: boolean;

    @ManyToOne(() => Team, team => team.players)
    team: Team;

    @OneToOne(() => Rank, rank => rank.player)
    rank: Rank;






}