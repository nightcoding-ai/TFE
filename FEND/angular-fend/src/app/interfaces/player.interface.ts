import { ProfileDTO } from "../signup/DTO/profileDTO";
import { TeamDTO } from "../teams/DTO/teamDTO";

export interface PlayerInterface {
    id: number;
    name: string;
    userType: string;
    profile: ProfileDTO;
    team: TeamDTO;
}