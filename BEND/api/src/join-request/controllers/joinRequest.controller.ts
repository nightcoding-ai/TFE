import { Controller, Delete, Get, Param, Post, Req, UnauthorizedException, UseGuards } from "@nestjs/common";

import { DeleteResult } from "typeorm";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { JoinRequestDTO } from "../DTO/joinRequestDTO";
import { JoinRequest } from "../models/joinRequest.entity";
import { JoinRequestService } from "../providers/joinRequest.service";




@Controller('joinrequests')
export class JoinRequestController {

    constructor(
        private JoinRequestService: JoinRequestService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(
        @Req() req:any): Promise<JoinRequest | UnauthorizedException> {
        console.log(req.user.playerID, req.body);
        return this.JoinRequestService.createOne(req.user.playerID, req.body);
    }

    @UseGuards(JwtAuthGuard)
    @Post('accept')
    acceptRequest(
        @Req() req:any): Promise<UnauthorizedException | DeleteResult> {
        return this.JoinRequestService.acceptRequest(req.user.playerID, req.body.joinRequestId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('all')
    getAllRequests(
        @Req() req:any): Promise<JoinRequestDTO[] | UnauthorizedException | null> { 
        return this.JoinRequestService.getAll(req.user.playerID);
    }

    @UseGuards(JwtAuthGuard)
    @Get('all/expired')
    getAllExpiredRequests(
        @Req() req:any): Promise<JoinRequest[] | null | UnauthorizedException> {
        return this.JoinRequestService.getAllExpiredRequests(req.user.playerID);
    }
    
    @UseGuards(JwtAuthGuard)
    @Get('mine')
    getAllOfAPlayer(
        @Req() req:any): Promise<JoinRequest[] | null> {
        return this.JoinRequestService.getAllOfAPlayer(req.user.playerID);
    }

    @UseGuards(JwtAuthGuard)
    @Post('team')
    getAllOfATeam(
        @Req() req:any): Promise<JoinRequest[] | UnauthorizedException | null> {
        return this.JoinRequestService.getAllOfTeam(req.user.playerID, req.body.teamId); 
    }

    @UseGuards(JwtAuthGuard)
    @Delete('refuse/:id')
    refuseRequest(
        @Param() id: number,
        @Req() req: any): Promise<DeleteResult | null | UnauthorizedException> {
        return this.JoinRequestService.deleteOne(req.user.playerID, id);
    }    
}