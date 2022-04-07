import { TeamDTO } from "src/teams/DTO/teamDTO";
import { ProfileDTO } from "../DTO/profil/profileDTO";
import { UserType } from "../enum/userType.enum";
import { Profile } from "../models/profile/profile.entity";

export interface PlayerInterface{

    name: string;
    profile: ProfileDTO;
    userType: UserType;
    team: TeamDTO;
    deletedAt: Date;
}