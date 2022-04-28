import { PlayerDTO } from "../../players/DTO/player/playerDTO";
import { Player } from "../../players/models/player/player.entity";

export class TeamDTO{

    id: number;
    name: string;
    abbreviation: string;
    logo: string;
    players: Player[];
}