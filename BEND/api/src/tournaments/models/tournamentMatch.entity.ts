import { Team } from "src/teams/models/teams.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BestOfTypeEnum } from "../enum/bestOfType.enum";
import { Tournament } from "./tournaments.entity";


@Entity()
export class TournamentMatch{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: 1})
    round: number;

    @Column({ enum: BestOfTypeEnum, default: BestOfTypeEnum.BO3})
    bestOfType: BestOfTypeEnum;

    @Column()
    isOver: boolean;

    @ManyToOne(() => Team, team => team.sideA)
    @JoinColumn()
    teamA: Team;

    @ManyToOne(() => Team, team => team.sideAWins)
    @JoinColumn()
    teamAWins: number;

    @ManyToOne(() => Team, team => team.sideB)
    @JoinColumn()
    teamB: Team;

    @ManyToOne(() => Team, team => team.sideBWins)
    @JoinColumn()
    teamBWins: number;

    @ManyToOne(() => Team, team => team.matchesWon)
    @JoinColumn()
    winner: Team;

    @ManyToOne(() => Tournament, tournament => tournament.matches)
    tournament: Tournament;

    
}