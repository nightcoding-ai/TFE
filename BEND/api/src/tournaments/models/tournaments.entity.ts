import { Team } from "src/teams/models/teams.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tournament {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: false })
    tournamentName: string;

    @Column()
    isFinished: boolean;

    @Column({ default: new Date(), nullable: true },)
    startDate: Date;

    @Column({ nullable: true})
    endDate: Date;

    @OneToMany(() => Team, team => team.tournament, { eager: true, cascade: true})
    teams: Team[];

  
}