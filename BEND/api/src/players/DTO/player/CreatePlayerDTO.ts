import { IsString } from "class-validator";
import { UserType } from "src/players/enum/userType.enum";
import { Profile } from "src/players/models/profile/profile.entity";
import { JoinRequest } from "src/join-request/models/joinRequest.entity";
import { TeamInvitation } from "src/team-invitation/models/teamInvitation.entity";
import { Team } from "src/teams/models/teams.entity";
import { CreateProfileDTO } from "../profil/CreateProfileDTO";
import { ProfileDTO } from "../profil/profileDTO";

export class CreatePlayerDTO {
    
    id?: number;
    userType: UserType;
    name: string;
    profile: CreateProfileDTO;
}