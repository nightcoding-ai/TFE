import { RoleEnum } from "src/players/enum/role.enum";
import { Player } from "src/players/models/player/player.entity";
import { Team } from "src/teams/models/teams.entity";

export interface JoinRequestInterface {

    id: number;
    role: RoleEnum;
    isApproved: boolean;
    createdAt: Date;
    expiredAt: Date;
    player: Player;
    team: Team;
}