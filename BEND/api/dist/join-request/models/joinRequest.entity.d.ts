import { RoleEnum } from "../../players/enum/role.enum";
import { Player } from "../../players/models/player/player.entity";
import { Team } from "../../teams/models/teams.entity";
export declare class JoinRequest {
    id: number;
    player: Player;
    team: Team;
    role: RoleEnum;
    isApproved: boolean;
    createdAt: Date;
    expiredAt: Date;
    deletedAt?: Date;
}
