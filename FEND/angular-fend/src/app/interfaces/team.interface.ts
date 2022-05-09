import { Player } from "./player.interface";



export interface Team {

    id?:number;
    name: string;
    abbreviation: string;
    logo: string;
    deletedAt?: Date;
    players: Player[];
}