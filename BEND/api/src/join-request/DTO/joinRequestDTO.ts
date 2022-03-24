import { RoleEnum } from "src/players/enum/role.enum";
import { Player } from "src/players/models/player/player.entity";
import { Team } from "src/teams/models/teams.entity";



export class JoinRequestDTO {
    id: number;

    player: Player;

    team: Team;

    Role: RoleEnum;

    isApproved: boolean;

    createdAt: Date;

    expiredAt: Date;

    
}