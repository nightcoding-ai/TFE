import { IsString } from "class-validator";
import { Profile } from "src/players/models/profile/profile.entity";
import { Team } from "src/teams/models/teams.entity";
import { ProfileDTO } from "../profil/profileDTO";

export class PlayerDTO {

    id: number;
    
    @IsString()
    name: string;

    profile: ProfileDTO;

    team: Team;
}