import { Player } from "src/players/models/player/player.entity";
import { TeamInvitation } from "src/team-invitation/models/teamInvitation";
import { TournamentMatch } from "src/tournaments/models/tournamentMatch.entity";
import { TournamentParticipation } from "src/tournaments/models/tournamentParticipation.entity";
import { Tournament } from "src/tournaments/models/tournaments.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Team {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique:true})
    name: string;

    @Column({ length: 3 })
    abbreviation: string;

    @Column({nullable: true})
    logo: string;

    @OneToMany(() => Player, player => player.team, {cascade: true, eager: true})
    players: Player[];

    @OneToMany(() => TournamentParticipation, tournamentParticipation => tournamentParticipation.team)
    tournamentParticipations : TournamentParticipation[];

    @OneToMany(() => TournamentMatch, tournamentMatch => tournamentMatch.teamA)
    sideA: TournamentMatch[];

    @OneToMany(() => TournamentMatch, tournamentMatch => tournamentMatch.teamAWins)
    sideAWins: number;

    @OneToMany(() => TournamentMatch, tournamentMatch => tournamentMatch.teamB)
    sideB: TournamentMatch[];

    @OneToMany(() => TournamentMatch, tournamentMatch => tournamentMatch.teamBWins)
    sideBWins: number;

    @OneToMany(() => TournamentMatch, tournamentMatch => tournamentMatch.winner)
    matchWon: TournamentMatch;

    @OneToMany( () => TeamInvitation, teamInvitation => teamInvitation.team, {nullable: true})
    invitationToPlayer: TeamInvitation[];
  


    

}  