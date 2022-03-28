import { Controller, Delete, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { identitytoolkit } from "googleapis/build/src/apis/identitytoolkit";
import { jwtConstants } from "src/auth/constants";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { DeleteResult } from "typeorm";
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
        @Req() req:any): Promise<JoinRequest>{
        return this.JoinRequestService.createOne(req.user.playerID, req.body);
    }

    @UseGuards(JwtAuthGuard)
    @Post('accept')
    acceptRequest(
        @Req() req:any): Promise<any>{
        return this.JoinRequestService.acceptRequest(req.user.playerID, req.body.joinRequestId);
    }
    

    @UseGuards(JwtAuthGuard)
    @Get('mine')
    getAllOfAPlayer(
        @Req() req:any): Promise<JoinRequest[]>{
        return this.JoinRequestService.getAllOfAPlayer(req.user.playerID);
    }

    @UseGuards(JwtAuthGuard)
    @Post('team')
    getAllOfATeam(
        @Req() req:any): Promise<JoinRequest[]>{
        return this.JoinRequestService.getAllOfTeam(req.user.playerID, req.body.teamId); 
    }

    @UseGuards(JwtAuthGuard)
    @Delete('refuse/:id')
    refuseRequest(
        @Param() id: number,
        @Req() req: any): Promise<DeleteResult>{
        return this.JoinRequestService.deleteOne(req.user.playerID, id);
    }
    
    
    
}