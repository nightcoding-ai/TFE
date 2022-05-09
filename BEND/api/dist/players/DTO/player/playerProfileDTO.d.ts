import { RankEnum } from "../../enum/rank.enum";
import { RoleEnum } from "../../enum/role.enum";
export declare class PlayerProfileDTO {
    id?: number;
    idProfile?: number;
    name: string;
    mail: string;
    discord: string;
    profilPicture?: string;
    ign: string;
    role: RoleEnum;
    rank: RankEnum;
    teamName?: string;
    deletedAt?: Date;
}
