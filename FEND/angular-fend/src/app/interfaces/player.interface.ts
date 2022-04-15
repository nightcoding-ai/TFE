import { ProfileDTO } from "../signup/DTO/profileDTO";
import { TeamDTO } from "../teams/DTO/teamDTO";
import { Profile } from "./profile.interface";
import { Team } from "./team.interface";

export interface Player {

    id?: number;
    name: string;
    userType?: string;
    profile: Profile;
    team?: Team;
}