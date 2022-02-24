import { Team } from "src/teams/models/teams.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PlayerInfo } from "./playerinfos.entity";
 
@Entity()
export class Player {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name: string;

    @OneToOne(() => PlayerInfo, {onDelete: 'CASCADE', cascade: true})
    @JoinColumn()
    playerInfo:  PlayerInfo;

    @ManyToOne(() => Team, team => team.players, { onDelete: 'SET NULL' }) 
    team: Team;

}



