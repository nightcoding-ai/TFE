import { JoinRequest } from "../../../join-request/models/joinRequest.entity";
import { TeamInvitation } from "../../../team-invitation/models/teamInvitation.entity";
import { Team } from "../../../teams/models/teams.entity";
import { UserType } from "../../enum/userType.enum";
import { Profile } from "../profile/profile.entity";
export declare class Player {
    id: number;
    name: string;
    userType: UserType;
    profile: Profile;
    team: Team;
    invitations: TeamInvitation[];
    joinRequests: JoinRequest[];
    deletedAt: Date;
}
