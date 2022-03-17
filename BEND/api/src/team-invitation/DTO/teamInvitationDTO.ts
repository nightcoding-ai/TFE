import { PlayerDTO } from "src/players/DTO/player/playerDTO";
import { TeamDTO } from "src/teams/DTO/teamDTO";

export class TeamInvitationDTO{
    id: number;
    player: PlayerDTO;
    team: TeamDTO;
    isApproved: boolean;
    createdAt: Date;
    expiredAt: Date;
}