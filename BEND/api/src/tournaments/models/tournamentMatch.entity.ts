import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Team } from "../../teams/models/teams.entity";
import { BestOfTypeEnum } from "../enum/bestOfType.enum";
import { Tournament } from "./tournaments.entity";



@Entity()
export class TournamentMatch{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: 1 })
    round: number;

    @Column({ default: 1})
    order: number;

    @Column({ enum: BestOfTypeEnum, default: BestOfTypeEnum.BO3 })
    bestOfType: BestOfTypeEnum;

    @Column({ default: false})
    isOver: boolean;

    @ManyToOne(() => Team, team => team.sideA, { eager: true })
    @JoinColumn()
    teamA: Team;

    @Column({ default: 0 })
    teamAWins: number;

    @ManyToOne(() => Team, team => team.sideB, { eager: true })
    @JoinColumn()
    teamB: Team;

    @Column({ default: 0 })
    teamBWins: number;

    @ManyToOne(() => Team, team => team.matchesWon, { eager: true, nullable: true })
    @JoinColumn()
    winner: Team;

    @ManyToOne(() => Tournament, tournament => tournament.matches)
    @JoinColumn()
    tournament: Tournament;
}