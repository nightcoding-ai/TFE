import { ProfileDTO } from "src/app/signup/DTO/profileDTO";
import { TeamDTO } from "src/app/teams/DTO/teamDTO";
import { RankEnum } from "../../ranks.enum";
import { RoleEnum } from "../../roles.enum";
import { userTypeEnum } from "../../userType.enum";

export class PlayerDTO{

    id?: number;
    name: string;
    userType?: userTypeEnum;
    discord: string;
    profilPicture?: string;
    ign : string;
    role: RoleEnum;
    rank: RankEnum;
    teamId?: number;
    teamName?: string;
    deletedAt?: Date;
}