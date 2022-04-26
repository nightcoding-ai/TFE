import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { JoinRequest } from "../../../join-request/models/joinRequest.entity";
import { TeamInvitation } from "../../../team-invitation/models/teamInvitation.entity";
import { Team } from "../../../teams/models/teams.entity";
import { UserType } from "../../enum/userType.enum";
import { Profile } from "../profile/profile.entity";



@Entity()
export class Player {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 40, unique: true })
    name: string;

    @Column({ enum: UserType, default: UserType.USER })
    userType: UserType;

    @OneToOne(() => Profile, profile => profile.player, { onDelete: 'CASCADE', cascade: true, eager:true })
    @JoinColumn()
    profile: Profile;

    @ManyToOne(() => Team, team => team.players , { nullable: true })
    team : Team;

    @OneToMany(() => TeamInvitation, teamInvitation => teamInvitation.player, {nullable: true })
    invitations: TeamInvitation[];

    @OneToMany(() => JoinRequest, joinRequest => joinRequest.player, {nullable: true })
    joinRequests: JoinRequest[];

    @DeleteDateColumn()
    deletedAt: Date;

}