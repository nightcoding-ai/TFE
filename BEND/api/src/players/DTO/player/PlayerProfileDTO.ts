import { RankEnum } from "../../enum/rank.enum";
import { RoleEnum } from "../../enum/role.enum";




export class PlayerProfileDTO {

    id?: number;
    name: string;
    mail: string;
    discord: string;
    profilPicture?: string;
    ign : string;
    role: RoleEnum;
    rank: RankEnum;
    teamName?: string;
    deletedAt?: Date;
}