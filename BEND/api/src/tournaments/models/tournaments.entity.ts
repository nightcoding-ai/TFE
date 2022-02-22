import { Team } from "src/teams/models/teams.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tournament {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tournamentName: string;

    @Column()
    isFinished: boolean;

    @ManyToMany(() => Team, team => team.tournaments)
    teams: Team[];

}