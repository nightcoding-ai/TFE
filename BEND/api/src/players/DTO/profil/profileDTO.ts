import { RankEnum } from "../../enum/rank.enum";
import { RoleEnum } from "../../enum/role.enum";

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