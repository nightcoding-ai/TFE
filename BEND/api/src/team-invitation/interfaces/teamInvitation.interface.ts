import { RoleEnum } from "../../players/enum/role.enum";
import { Player } from "../../players/models/player/player.entity";
import { Team } from "../../teams/models/teams.entity";

export interface TeamInvitationInterface{

    id: number;
    role: RoleEnum;
    isApproved: boolean;
    createdAt: Date;
    expiredAt: Date;
    player: Player;
    team: Team;
}