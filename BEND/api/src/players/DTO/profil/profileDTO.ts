import { RankEnum } from "src/players/enum/rank.enum";
import { RoleEnum } from "src/players/enum/role.enum";
import { Player } from "src/players/models/player/player.entity";

export class ProfileDTO {

    id?: number;
    email: string;
    password: string;
    profilPicture: string;
    discord: string;
    inGameName: string;
    role: RoleEnum;
    rank: RankEnum;
    isCaptain?: boolean;
}