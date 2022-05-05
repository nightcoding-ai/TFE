import { RankEnum } from "../ranks.enum";
import { RoleEnum } from "../roles.enum";

export interface JoinRequest {

    id?: number;
    playerId: number;
    playerName: string;
    playerProfilePicture?: string;
    playerRank?: RankEnum;
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