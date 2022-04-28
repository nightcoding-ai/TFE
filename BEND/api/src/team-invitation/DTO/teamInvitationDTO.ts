import { PlayerDTO } from "../../players/DTO/player/playerDTO";
import { RoleEnum } from "../../players/enum/role.enum";
import { Player } from "../../players/models/player/player.entity";
import { TeamDTO } from "../../teams/DTO/teamDTO";

export class TeamInvitationDTO{
    
    id?: number;
    role: RoleEnum;
    player: Player;
    team: TeamDTO;
    isApproved: boolean;
    createdAt: Date;
    expiredAt: Date;
    deletedAt: Date;
}