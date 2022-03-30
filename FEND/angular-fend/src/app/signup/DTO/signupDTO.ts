import { TeamDTO } from "src/app/teams/DTO/teamDTO";
import { userTypeEnum } from "src/app/userType.enum";
import { ProfileDTO } from "./profileDTO";

export class SignUpDTO{

    id?: number;

    name: string;

    userType?: userTypeEnum;

    profile: ProfileDTO;

}