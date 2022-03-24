import { RoleEnum } from "src/players/enum/role.enum";
import { Player } from "src/players/models/player/player.entity";
import { Team } from "src/teams/models/teams.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

const currentDate : Date = new Date();

@Entity()
export class JoinRequest {
    
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Player, player => player.joinRequests, {eager: true})
    @JoinColumn()
    player: Player;

    @ManyToOne(() => Team, team => team.invitationToPlayer, {eager: true})
    @JoinColumn()
    team: Team;

    @Column({ enum: RoleEnum, nullable: false})
    role: RoleEnum;

    @Column({ nullable: false, default: false})
    isApproved: boolean;

    @Column({ type: 'date', default: new Date()})
    createdAt: Date;

    @Column({ type: 'date', default: new Date(currentDate.setDate(currentDate.getDate() + 7))})
    expiredAt: Date;
}