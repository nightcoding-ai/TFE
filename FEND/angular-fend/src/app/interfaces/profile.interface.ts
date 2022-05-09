import { RankEnum } from "../ranks.enum";
import { RoleEnum } from "../roles.enum";



export interface Profile {

    id?:number;
    email: string;
    password?: string;
    profilPicture: string;
    discord: string;
    inGameName: string;
    role: RoleEnum;
    rank: RankEnum;
    isCaptain?: boolean;
}