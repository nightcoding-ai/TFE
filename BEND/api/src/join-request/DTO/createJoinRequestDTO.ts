import { RoleEnum } from "src/players/enum/role.enum";
import { Player } from "src/players/models/player/player.entity";
import { Team } from "src/teams/models/teams.entity";





export class CreateJoinRequestDTO {
    id?: number;

    playerId: number;

    teamId: number;

    Role: RoleEnum;

    isApproved?: boolean;

    createdAt?: Date;

    expiredAt?: Date;

    
}