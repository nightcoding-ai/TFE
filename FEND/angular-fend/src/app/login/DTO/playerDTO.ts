import { RankEnum } from "../../ranks.enum";
import { RoleEnum } from "../../roles.enum";


export class getPlayerDTO {

    id?:number;
    profilPicture?: string;
    name: string;
    ign: string;
    discord: string;
    role: RoleEnum;
    rank: RankEnum;
    teamName?: string;
}