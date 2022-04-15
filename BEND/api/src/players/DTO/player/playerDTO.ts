import { IsString } from "class-validator";
import { UserType } from "src/players/enum/userType.enum";
import { Profile } from "src/players/models/profile/profile.entity";
import { Team } from "src/teams/models/teams.entity";
import { RankEnum } from "../../enum/rank.enum";
import { RoleEnum } from "../../enum/role.enum";
import { ProfileDTO } from "../profil/profileDTO";

export class PlayerDTO {

    id?: number;
    name: string;
    userType?: UserType;
    discord: string;
    ign : string;
    role: RoleEnum;
    rank: RankEnum;
    teamName: string;
    deletedAt?: Date;
}