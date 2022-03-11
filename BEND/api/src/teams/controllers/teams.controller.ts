import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, UseGuards } from "@nestjs/common";
import { userInfo } from "os";
import { Observable } from "rxjs";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { JwtStrategy } from "src/auth/strategy/jwt.strategy";
import { Player } from "src/players/models/player/player.entity";
import { DeleteResult, UpdateResult } from "typeorm";
import { runInThisContext } from "vm";
import { TeamDTO } from "../DTO/teamDTO";
import { Team } from "../models/teams.entity";
import { TeamsService } from "../providers/teams.service";



@Controller('teams')
export class TeamsController {

    constructor(
        private TeamService : TeamsService
    ){}

    @UseGuards(JwtAuthGuard)
    @Post('')
    async addTeam(
        @Req() req: any): Promise<void> {
        return this.TeamService.create(req.user.playerID, req.body);
         
        
    }

    @Get('all')
    getAll(): Promise<TeamDTO[]> {
        return this.TeamService.getAll();
    }

    @Get('single/:id')
    getTeam(
        @Param() idTeam: number): Promise<TeamDTO> {
        return this.TeamService.getTeam(idTeam);
        }

    @UseGuards(JwtAuthGuard)
    @Put('modify/:id')
    updateTeam(
        @Param() idTeam: number,
        @Body() teamDTO: TeamDTO): Promise<UpdateResult> {
        return this.TeamService.updateTeam(idTeam, teamDTO);
        }

    @UseGuards(JwtAuthGuard)
    @Delete('delete')
    deleteTeam(
        @Req() req:any): Promise<DeleteResult> {
        return this.TeamService.deleteTeam(req.user.playerID);
        }




    
}