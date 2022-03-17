import { UserType } from "src/players/enum/userType.enum";
import { TeamInvitation } from "src/team-invitation/models/teamInvitation";
import { Team } from "src/teams/models/teams.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "../profile/profile.entity";


@Entity()
export class Player {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 40 })
    name: string;

    @Column({enum: UserType, default: UserType.USER})
    userType: UserType;

    @OneToOne(() => Profile, profile => profile.player, { onDelete: 'CASCADE', eager:true, cascade: true})
    @JoinColumn()
    profile: Profile;

    @ManyToOne(() => Team, team => team.players , { nullable: true })
    team : Team;

    @OneToMany(() => TeamInvitation, teamInvitation => teamInvitation.player, {nullable: true})
    invitations: TeamInvitation[];


    
}