import { UnauthorizedException } from "@nestjs/common";
import { DeleteResult } from "typeorm";
import { PlayerRepository } from "../../players/repository/player/player.repository";
import { TeamInvitationInterface } from "../interfaces/teamInvitation.interface";
import { TeamInvitationRepository } from "../repositories/teamInvitation.repository";
export declare class TeamInvitationService {
    private readonly TeamInvitationRepo;
    private readonly PlayerRepo;
    constructor(TeamInvitationRepo: TeamInvitationRepository, PlayerRepo: PlayerRepository);
    createOne(idPlayer: number, invitation: any): Promise<TeamInvitationInterface | UnauthorizedException>;
    acceptedInvitation(playerId: number, idNotif: number): Promise<DeleteResult | UnauthorizedException>;
    getAll(): Promise<TeamInvitationInterface[] | null>;
    getAllOfAPlayer(idPlayer: number): Promise<TeamInvitationInterface[] | null>;
    getAllOfATeam(idPlayer: number): Promise<TeamInvitationInterface[] | null>;
    deleteAllOfAPlayer(idPlayer: number): Promise<DeleteResult>;
    deleteOne(idPlayer: number, idNotif: number): Promise<DeleteResult | UnauthorizedException>;
    deleteAllExpiredInvitations(): Promise<DeleteResult>;
}
