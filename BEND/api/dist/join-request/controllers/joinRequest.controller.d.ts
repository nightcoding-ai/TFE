import { UnauthorizedException } from "@nestjs/common";
import { DeleteResult } from "typeorm";
import { JoinRequestDTO } from "../DTO/joinRequestDTO";
import { JoinRequest } from "../models/joinRequest.entity";
import { JoinRequestService } from "../providers/joinRequest.service";
export declare class JoinRequestController {
    private JoinRequestService;
    constructor(JoinRequestService: JoinRequestService);
    create(req: any): Promise<JoinRequest | UnauthorizedException>;
    acceptRequest(req: any): Promise<UnauthorizedException | DeleteResult>;
    getAllRequests(req: any): Promise<JoinRequestDTO[] | UnauthorizedException | null>;
    getAllExpiredRequests(req: any): Promise<JoinRequest[] | null | UnauthorizedException>;
    getAllOfAPlayer(req: any): Promise<JoinRequest[] | null>;
    getAllOfATeam(req: any): Promise<JoinRequestDTO[] | UnauthorizedException | null>;
    refuseRequest(id: number, req: any): Promise<DeleteResult | null | UnauthorizedException>;
}
