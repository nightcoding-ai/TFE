import { ProfileDTO } from "src/app/signup/DTO/profileDTO";
import { TeamDTO } from "src/app/teams/DTO/teamDTO";

export class PLayerDTO{
    id: number;
    name: string;
    userType: string;
    profile: ProfileDTO;
    team: TeamDTO;
}