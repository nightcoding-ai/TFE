import { RankEnum } from "../../players/enum/rank.enum";
import { RoleEnum } from "../../players/enum/role.enum";


export class JoinRequestDTO {

    id?: number;
    playerId: number;
    playerName: string;
    playerProfilePicture?: string;
    playerRank: RankEnum;
    playerRole: RoleEnum;
    playerDiscord: string;
    playerIGN: string;
    teamId: number;
    role: RoleEnum;
    isApproved: boolean;
    createdAt: Date;
    expiredAt: Date;
    deletedAt?: Date;
}