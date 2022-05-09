import { RankEnum } from "../../enum/rank.enum";
import { RoleEnum } from "../../enum/role.enum";
export declare class CreateProfileDTO {
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
