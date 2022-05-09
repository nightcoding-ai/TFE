import { UnauthorizedException } from "@nestjs/common";
import { DeleteResult } from "typeorm";
import { RoleEnum } from "../../players/enum/role.enum";
import { PlayerRepository } from "../../players/repository/player/player.repository";
import { Team } from "../../teams/models/teams.entity";
import { TeamRepository } from "../../teams/repository/teams.repository";
import { CreateJoinRequestDTO } from "../DTO/createJoinRequestDTO";
import { JoinRequestDTO } from "../DTO/joinRequestDTO";
import { JoinRequest } from "../models/joinRequest.entity";
import { JoinRequestRepository } from "../repositories/joinRequest.repository";
export declare class JoinRequestService {
    private readonly JoinRequestRepository;
    private readonly PlayerRepository;
    private readonly TeamRepository;
    constructor(JoinRequestRepository: JoinRequestRepository, PlayerRepository: PlayerRepository, TeamRepository: TeamRepository);
    createOne(idPlayer: number, joinRequest: CreateJoinRequestDTO): Promise<JoinRequest | UnauthorizedException>;
    acceptRequest(idCaptain: number, idRequest: number): Promise<UnauthorizedException | DeleteResult>;
    getAll(adminId: number): Promise<JoinRequestDTO[] | UnauthorizedException | null>;
    getAllOfAPlayer(idPlayer: number): Promise<JoinRequest[] | null>;
    getAllOfTeam(idCaptain: number, idTeam: number): Promise<JoinRequestDTO[] | null | UnauthorizedException>;
    getAllExpiredRequests(adminId: number): Promise<JoinRequest[] | null | UnauthorizedException>;
    deleteOne(idPlayer: number, idJoinRequest: number): Promise<DeleteResult | null | UnauthorizedException>;
    deleteAllOfAPlayer(idPlayer: number): Promise<DeleteResult>;
    deleteAllOfATeam(idTeam: number): Promise<DeleteResult>;
    deleteAllOfATeamByRole(role: RoleEnum, team: Team): Promise<DeleteResult>;
    deleteAllExpiredRequests(): Promise<DeleteResult>;
}
