import { RankEnum } from "../../enum/rank.enum";
import { RoleEnum } from "../../enum/role.enum";
import { Player } from "../player/player.entity";
export declare class Profile {
    id: number;
    email: string;
    password: string;
    profilPicture: string;
    discord: string;
    inGameName: string;
    role: RoleEnum;
    rank: RankEnum;
    isCaptain: boolean;
    player: Player;
}
