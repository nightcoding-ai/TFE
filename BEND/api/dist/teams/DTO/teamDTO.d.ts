import { PlayerDTO } from "../../players/DTO/player/playerDTO";
export declare class TeamDTO {
    id: number;
    name: string;
    abbreviation: string;
    logo: string;
    players: PlayerDTO[];
}
