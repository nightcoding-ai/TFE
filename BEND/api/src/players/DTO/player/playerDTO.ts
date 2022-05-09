import { RankEnum } from "../../enum/rank.enum";
import { RoleEnum } from "../../enum/role.enum";
import { UserType } from "../../enum/userType.enum";

export class PlayerDTO {

    id?: number;
    name: string;
    userType?: UserType;
    discord: string;
    profilPicture?: string;
    ign : string;
    role: RoleEnum;
    rank: RankEnum;
    isCaptain?: boolean;
    teamId?: number;
    teamName?: string;
    deletedAt?: Date;
}