import { RoleEnum } from "../../players/enum/role.enum";
export declare class CreateJoinRequestDTO {
    id?: number;
    player: number;
    team: number;
    role: RoleEnum;
    isApproved?: boolean;
    createdAt?: Date;
    expiredAt?: Date;
}
