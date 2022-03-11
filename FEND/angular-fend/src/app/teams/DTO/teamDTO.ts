import { PLayerDTO } from "src/app/profile-player/DTO/playerDTO";

export class TeamDTO{
    id: number;
    name: string;
    abbreviation: string;
    players: PLayerDTO[];
}