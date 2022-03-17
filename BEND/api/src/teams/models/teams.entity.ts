import { Player } from "src/players/models/player/player.entity";
import { TeamInvitation } from "src/team-invitation/models/teamInvitation";
import { Tournament } from "src/tournaments/models/tournaments.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


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

    @ManyToOne(() => Tournament, tournament => tournament.teams)
    tournament: Tournament;

    @OneToMany( () => TeamInvitation, teamInvitation => teamInvitation.team, {nullable: true})
    invitationToPlayer: TeamInvitation[];
  


    

}  