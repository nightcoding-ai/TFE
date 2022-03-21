import { Team } from "src/teams/models/teams.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Tournament } from "./tournaments.entity";


@Entity()
export class TournamentParticipation {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Tournament, tournament => tournament.participants)
    tournament: Tournament;

    @ManyToOne(() => Team, team => team.tournamentParticipations)
    team: Team;
}