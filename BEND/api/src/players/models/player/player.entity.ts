import { UserType } from "src/players/enum/userType.enum";
import { Team } from "src/teams/models/teams.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
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

    @ManyToOne(() => Team, team => team.players , { nullable: true, onDelete: 'CASCADE' })
    team : Team;


    
}