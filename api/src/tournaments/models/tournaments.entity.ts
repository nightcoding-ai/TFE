import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tournament {
    @PrimaryGeneratedColumn()
    idTournament: number;

    @Column()
    tournamentName: string;

    @Column()
    isFinished: boolean;
}
