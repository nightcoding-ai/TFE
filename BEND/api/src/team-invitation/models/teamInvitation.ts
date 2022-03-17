import { Player } from "src/players/models/player/player.entity";
import { Team } from "src/teams/models/teams.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

const currentDate : Date = new Date();

@Entity()
export class TeamInvitation {


    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Player, player => player.invitations, {eager: true})
    player: Player;

    @ManyToOne(() => Team, team => team.invitationToPlayer, {eager: true})
    team: Team;

    @Column({ nullable: false, default: false})
    isApproved: boolean;

    @Column({ type: 'date', default: new Date()})
    createdAt: Date;

    @Column({ type: 'date', default: new Date(currentDate.setDate(currentDate.getDate() + 7))})
    expiredAt: Date;
}