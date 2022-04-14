import { Team } from "src/teams/models/teams.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Tournament } from "./tournaments.entity";


@Entity()
export class TournamentParticipation {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Tournament, tournament => tournament.participants, { eager: true, cascade: true })
    @JoinColumn()
    tournament: Tournament;

    @ManyToOne(() => Team, team => team.tournamentParticipations, { eager: true, cascade: true })
    @JoinColumn()
    team: Team;
}