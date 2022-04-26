import { ProfileDTO } from "src/app/signup/DTO/profileDTO";
import { TeamDTO } from "src/app/teams/DTO/teamDTO";
import { RankEnum } from "../../ranks.enum";
import { RoleEnum } from "../../roles.enum";

export class PlayerDTO{

    id?: number;
    name: string;
    profilPicture?: string;
    discord: string;
    inGameName: string;
    rank: RankEnum;
    role: RoleEnum;
    teamName?: string;
}