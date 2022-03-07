import { PlayerDTO } from "src/players/DTO/player/playerDTO";
import { Tournament } from "src/tournaments/models/tournaments.entity";

export class TeamDTO{

    name: string;

    abbreviation: string;

    logo: string;

    players: PlayerDTO[];


}