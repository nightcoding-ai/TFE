import { Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
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
        console.log(req.body);
        return this.JoinRequestService.createOne(req.user.playerID, req.body);
    }
    
    @Get()
    getAll(): Promise<JoinRequest[]>{
        return this.JoinRequestService.getAll();
    }
    
    
}