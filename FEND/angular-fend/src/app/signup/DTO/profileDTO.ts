import { RankEnum } from "src/app/ranks.enum";
import { RoleEnum } from "src/app/roles.enum";

export class ProfileDTO{

    id?: number;

    email: string;

    password: string;

    profilPicture?: File;

    discord: string;

    inGameName: string;

    role: RoleEnum;

    rank: RankEnum;

    isCaptain?: boolean;
}