import { TeamInvitationService } from "../providers/teamInvitation.service";
export declare class TeamInvitationController {
    private readonly TeamInvitationService;
    constructor(TeamInvitationService: TeamInvitationService);
    create(req: any): Promise<import("@nestjs/common").UnauthorizedException | import("../interfaces/teamInvitation.interface").TeamInvitationInterface>;
    accepteInvitation(req: any): Promise<import("typeorm").DeleteResult | import("@nestjs/common").UnauthorizedException>;
    getAll(): Promise<import("../interfaces/teamInvitation.interface").TeamInvitationInterface[]>;
    getAllOfteam(req: any): Promise<import("../interfaces/teamInvitation.interface").TeamInvitationInterface[]>;
    getAllOfAPlayer(req: any): Promise<import("../interfaces/teamInvitation.interface").TeamInvitationInterface[]>;
    deleteOne(idNotif: number, req: any): Promise<import("typeorm").DeleteResult | import("@nestjs/common").UnauthorizedException>;
    deleteAllOfPlayer(req: any): Promise<import("typeorm").DeleteResult>;
}
