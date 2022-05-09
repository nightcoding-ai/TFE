import { Player } from "../../players/models/player/player.entity";
export declare class CreateTeamDTO {
    id?: number;
    name: string;
    abbreviation: string;
    logo?: string;
    players?: Player[];
}
