import { Team } from "src/teams/models/teams.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TournamentMatch } from "./tournamentMatch.entity";

@Entity()
export class Tournament {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: false })
    name: string;

    @Column({ default: false})
    isFinished: boolean;

    @Column({ default: 8})
    seed: number;

    @Column({ default: new Date()})
    startDate: Date;

    @Column({ nullable: true, default: null})
    endDate: Date;

    @OneToMany(() => Team, team => team.tournament, { eager: true, cascade: true})
    teams: Team[];

    @OneToMany(() => TournamentMatch, tournamentMatch => tournamentMatch.tournament)
    matches : TournamentMatch[];

  
}