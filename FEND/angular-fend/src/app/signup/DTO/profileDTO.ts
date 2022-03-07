import { RankEnum } from "src/app/ranks.enum";
import { RoleEnum } from "src/app/roles.enum";

export class ProfileDTO{
    email: string;

    password: string;

    profilPicture: string;

    discord: string;

    inGameName: string;

    role: RoleEnum;

    rank: RankEnum;
}