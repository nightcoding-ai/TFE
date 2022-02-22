import { ExecOptionsWithStringEncoding } from "child_process";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Player } from "./players.entity";

export enum playerLoLRank {

    CHALLENGER = "Challenger",

    GRANDMASTER = "Grand Maître",

    MASTER = "Maître",

    DIAMOND = "Diamant",

    PLATINUM = "Platine",

    GOLD = "Or",

    SILVER = "Argent",

    BRONZE = "Bronze",

    IRON = "Fer"
    
}

export enum playerLoLRole {

    TOP = "Toplane",
    
    JUN = "Jungle",

    MID = "Midlane",

    ADC = "ADC",

    SUP = "Support"
}

@Entity()
export class PlayerInfo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    password: string;

    @Column({nullable: true})
    profilPicture: string;

    @Column({nullable: true})
    discord: string;

    @Column({nullable: true})
    igName: string;

    @Column({nullable: false,
            enum: playerLoLRole
            })
    role: playerLoLRole;

    @Column({nullable: true,
            enum: playerLoLRank,
            })
    rank: playerLoLRank;

    @Column({nullable: false, default: false})
    isCaptain: boolean;

    


}
