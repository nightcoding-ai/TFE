import { Player } from "../../interfaces/player.interface";

export class TeamDTO{
    id?: number;
    name: string;
    abbreviation: string;
    logo: string;
    players: Player[];
}