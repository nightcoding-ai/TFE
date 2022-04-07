import { PlayerDTO } from "src/players/DTO/player/playerDTO";
import { RoleEnum } from "src/players/enum/role.enum";
import { TeamDTO } from "src/teams/DTO/teamDTO";

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