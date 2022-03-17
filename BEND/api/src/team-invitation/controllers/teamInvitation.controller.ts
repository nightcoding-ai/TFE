import { Controller, Delete, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { TeamInvitationService } from "../providers/teamInvitation.service";


@Controller('invitations')
export class TeamInvitationController{

    constructor(
        private readonly TeamInvitationService: TeamInvitationService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(
        @Req() req:  any) {
        console.log("ID du jouer connecté ", req.user.playerID, req.body);
        return this.TeamInvitationService.createOne(req.user.playerID, req.body);
    }

    @Get()
    getAll() {
        return this.TeamInvitationService.getAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('my_team')
    getAllOfteam(
        @Req() req: any) {
        return this.TeamInvitationService.getAllOfATeam(req.user.playerID);
    }

    @UseGuards(JwtAuthGuard)
    @Get('mine')
    getAllOfAPlayer(
        @Req() req: any) {
        return this.TeamInvitationService.getAllOfAPlayer(req.user.playerID);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    deleteOne(
        @Param() idNotif: number,
        @Req() req: any) {
        return this.TeamInvitationService.deleteOne(req.user.playerID, idNotif);
        }


}