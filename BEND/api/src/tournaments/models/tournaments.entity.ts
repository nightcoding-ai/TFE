import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SeedEnum } from "../enum/seed.enum";
import { TournamentMatch } from "./tournamentMatch.entity";
import { TournamentParticipation } from "./tournamentParticipation.entity";

@Entity()
export class Tournament {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column({ default: SeedEnum.SEED8, enum: SeedEnum})
    seed: SeedEnum;

    @Column({ default: false})
    areInscriptionsClosed: boolean;

    @Column({ default: new Date()})
    startDate: Date;

    @Column({ nullable: true, default: null})
    endDate: Date;

    @OneToMany(() => TournamentParticipation, tournamentParticipation => tournamentParticipation.tournament)
    
    participants: TournamentParticipation[];

    @OneToMany(() => TournamentMatch, tournamentMatch => tournamentMatch.tournament, { eager: true })
    matches : TournamentMatch[];
 
}