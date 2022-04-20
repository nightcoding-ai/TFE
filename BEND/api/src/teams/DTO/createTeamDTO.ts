import { PlayerDTO } from "../../players/DTO/player/playerDTO";
import { PlayerInterface } from "../../players/interfaces/player.interface";



export class CreateTeamDTO {

    id?: number;
    name: string;
    abbreviation: string;
    logo?:string;
    players?: PlayerInterface[];
}