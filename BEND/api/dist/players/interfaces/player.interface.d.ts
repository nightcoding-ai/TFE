import { TeamDTO } from "../../teams/DTO/teamDTO";
import { ProfileDTO } from "../DTO/profil/profileDTO";
import { UserType } from "../enum/userType.enum";
export interface PlayerInterface {
    name: string;
    profile: ProfileDTO;
    userType: UserType;
    team: TeamDTO;
    deletedAt: Date;
}
