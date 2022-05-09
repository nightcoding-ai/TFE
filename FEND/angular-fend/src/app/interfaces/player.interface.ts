import { RankEnum } from "../ranks.enum";
import { RoleEnum } from "../roles.enum";


export interface Player {

    id?: number;
    userType?: string;
    name: string;
    discord: string;
    profilPicture?: string;
    role: RoleEnum;
    rank?: RankEnum;
    isCaptain: boolean;
    ign: string;
    teamId?: number;
    teamName?: string;
}