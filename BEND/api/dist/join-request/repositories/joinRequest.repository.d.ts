import { RoleEnum } from "src/players/enum/role.enum";
import { Team } from "src/teams/models/teams.entity";
import { DeleteResult, Repository } from "typeorm";
import { JoinRequest } from "../models/joinRequest.entity";
export declare class JoinRequestRepository extends Repository<JoinRequest> {
    createOne(joinRequest: any): Promise<JoinRequest>;
    getOne(joinRequestId: number): Promise<JoinRequest>;
    saveRequest(request: JoinRequest): Promise<JoinRequest>;
    getAll(): Promise<JoinRequest[]>;
    getAllOfATeam(teamId: number): Promise<JoinRequest[]>;
    getAllOfAPlayer(playerId: number): Promise<JoinRequest[]>;
    getRequestToTeam(playerId: number, teamId: number): Promise<JoinRequest[]>;
    deleteOne(joinRequestId: number): Promise<DeleteResult>;
    deleteAllOfAPlayer(playerId: number): Promise<DeleteResult>;
    deleteAllOfATeam(teamId: number): Promise<DeleteResult>;
    deleteAllOfATeamByRole(roleToDelete: RoleEnum, team: Team): Promise<any>;
    deleteAllExpiredRequests(): Promise<DeleteResult>;
    getAllWithExpiredRequests(): Promise<JoinRequest[]>;
}
