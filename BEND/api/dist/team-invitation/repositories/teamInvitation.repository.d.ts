import { DeleteResult, Repository } from "typeorm";
import { RoleEnum } from "../../players/enum/role.enum";
import { TeamInvitationDTO } from "../DTO/teamInvitationDTO";
import { TeamInvitationInterface } from "../interfaces/teamInvitation.interface";
import { TeamInvitation } from "../models/teamInvitation.entity";
export declare class TeamInvitationRepository extends Repository<TeamInvitation> {
    createNewInvitation(newInvitation: TeamInvitationDTO): Promise<TeamInvitationInterface>;
    getOne(idNotif: number): Promise<TeamInvitationInterface>;
    getAll(): Promise<TeamInvitationInterface[]>;
    getOneOfOnePlayer(idPlayer: number): Promise<TeamInvitationInterface>;
    getAllOfOnePlayer(idPlayer: number): Promise<TeamInvitationInterface[]>;
    getAllOfOneTeam(idTeam: number): Promise<TeamInvitationInterface[]>;
    deleteAllOfPlayer(idPlayer: number): Promise<DeleteResult>;
    deleteAllOfTeam(idTeam: number): Promise<DeleteResult>;
    deleteAllOfTeamByPlayerRole(roleToDelete: RoleEnum, idTeam: number): Promise<DeleteResult>;
    deleteOne(idNotif: number): Promise<DeleteResult>;
    deleteAllExpiredInvitations(): Promise<DeleteResult>;
}
