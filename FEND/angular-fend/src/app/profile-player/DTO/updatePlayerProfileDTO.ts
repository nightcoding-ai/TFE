import { RankEnum } from "../../ranks.enum";
import { RoleEnum } from "../../roles.enum";

export class UpdatePlayerProfileDTO {

    email?: string;
    discord?: string;
    profilPicture?: string;
    ign?: string;
    role?: RoleEnum;
    rank?: RankEnum;
}