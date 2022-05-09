import { RankEnum } from "../../enum/rank.enum";
import { RoleEnum } from "../../enum/role.enum";


export class UpdatePlayerProfileDTO {

    email?: string;
    discord?: string;
    ign?: string;
    role?: RoleEnum;
    rank?: RankEnum;
}