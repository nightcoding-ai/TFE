import { RankEnum } from "../../enum/rank.enum";
import { RoleEnum } from "../../enum/role.enum";
import { UserType } from "../../enum/userType.enum";
export declare class FreePlayerDTO {
    id?: number;
    name: string;
    userType?: UserType;
    discord: string;
    ign: string;
    role: RoleEnum;
    rank: RankEnum;
    deletedAt?: Date;
}
