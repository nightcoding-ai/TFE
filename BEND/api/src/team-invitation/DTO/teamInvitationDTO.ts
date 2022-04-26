import { PlayerDTO } from "../../players/DTO/player/playerDTO";
import { RoleEnum } from "../../players/enum/role.enum";
import { TeamDTO } from "../../teams/DTO/teamDTO";

export class TeamInvitationDTO{
    
    id?: number;
    role: RoleEnum;
    player: PlayerDTO;
    team: TeamDTO;
    isApproved: boolean;
    createdAt: Date;
    expiredAt: Date;
    deletedAt: Date;
}