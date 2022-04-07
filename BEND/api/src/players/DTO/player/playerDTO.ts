import { IsString } from "class-validator";
import { UserType } from "src/players/enum/userType.enum";
import { Profile } from "src/players/models/profile/profile.entity";
import { Team } from "src/teams/models/teams.entity";
import { ProfileDTO } from "../profil/profileDTO";

export class PlayerDTO {

    id?: number;
    name: string;
    userType?: UserType;
    profile: ProfileDTO;
    team?: Team;
    deletedAt?: Date;
}