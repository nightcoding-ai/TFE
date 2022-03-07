import { IsString } from "class-validator";
import { Profile } from "src/players/models/profile/profil.entity";
import { Team } from "src/teams/models/teams.entity";
import { CreateProfileDTO } from "../profil/CreateProfileDTO";
import { ProfileDTO } from "../profil/profileDTO";

export class CreatePlayerDTO {
    

    @IsString()
    name: string;

    
    profile: CreateProfileDTO;


    team: Team;
}