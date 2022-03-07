import { RankEnum } from "src/players/enum/rank.enum";
import { RoleEnum } from "src/players/enum/role.enum";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Player } from "../player/player.entity";


@Entity()
export class Profile {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: false})
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    profilPicture: string;

    @Column({ nullable: true })
    discord: string;

    @Column({ nullable: false })
    inGameName: string;

    @Column({ nullable: false,
            enum: RoleEnum })
    role: RoleEnum

    @Column({ nullable: true,
            enum: RankEnum})
    rank: RankEnum;

    @Column({ nullable: false, default: false})
    isCaptain: boolean;

    @OneToOne(() => Player, player => player.profile)
    player: Player;
}