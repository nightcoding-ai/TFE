import { RoleEnum } from "../../players/enum/role.enum";


export class JoinRequestDTO {

    id?: number;
    playerName: string;
    teamName: string;
    role: RoleEnum;
    isApproved: boolean;
    createdAt: Date;
    expiredAt: Date;
    deletedAt?: Date;
}