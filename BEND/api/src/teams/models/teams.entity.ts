import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { JoinRequest } from "../../join-request/models/joinRequest.entity";
import { Player } from "../../players/models/player/player.entity";
import { TeamInvitation } from "../../team-invitation/models/teamInvitation.entity";
import { TournamentMatch } from "../../tournaments/models/tournamentMatch.entity";
import { TournamentParticipation } from "../../tournaments/models/tournamentParticipation.entity";



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

    @OneToMany(() => TournamentMatch, tournamentMatch => tournamentMatch.teamB)
    sideB: TournamentMatch[];

    @OneToMany(() => TournamentMatch, tournamentMatch => tournamentMatch.winner)
    matchesWon: TournamentMatch[];

    @OneToMany( () => TeamInvitation, teamInvitation => teamInvitation.team, {nullable: true})
    invitationToPlayer: TeamInvitation[];

    @OneToMany( () => JoinRequest, joinRequest => joinRequest.team, {nullable: true})
    joinRequestsReceived: JoinRequest[];

    @DeleteDateColumn()
    deletedAt?: Date;

}  