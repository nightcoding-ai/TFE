import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { userInfo } from "os";
import { Observable } from "rxjs";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { JwtStrategy } from "src/auth/strategy/jwt.strategy";
import { Player } from "src/players/models/player/player.entity";
import { DeleteResult, UpdateResult } from "typeorm";
import { runInThisContext } from "vm";
import { TeamDTO } from "../DTO/teamDTO";
import { TeamInterface } from "../interfaces/teams.interface";
import { Team } from "../models/teams.entity";
import { TeamsService } from "../providers/teams.service";



@Controller('teams')
export class TeamsController {

    constructor(
        private TeamService : TeamsService
    ){}

    @UseGuards(JwtAuthGuard)
    @Post('')
    addTeam(
        @Req() req: any): Promise<void> {
        return this.TeamService.create(req.user.playerID, req.body);
         
        
    }

    @UseGuards(JwtAuthGuard)
    @Post('ban')
    banPlayer(
        @Req() req:any): Promise<void> {
        return this.TeamService.banPlayer(req.user.playerID, req.body.idPlayer);
    }
    
    @UseGuards(JwtAuthGuard)
    @Post('setas_captain')
    setAsCaptain(
        @Req() req:any): Promise<void> {
        return this.TeamService.setAsCaptain(req.user.playerID, req.body.idPlayer);
    }
    
    @UseGuards(JwtAuthGuard)
    @Get('all')
    getAll(
        @Req() req:any): Promise<TeamInterface[]> {
        return this.TeamService.getAll(req.user.playerID);
    }

    @Get('count_teams')
    getNumberOfTeams(): Promise<number> {
        return this.TeamService.getNumberOfTeams();
    }

    @Get('full')
    getFullTeams(): Promise<TeamInterface[]> {
        return this.TeamService.getFullTeams();
    }

    @Get('not_full')
    getNotFullTeams(): Promise<TeamInterface[]> {
        return this.TeamService.getNotFullTeams();
    }

    @Get('with/:nbr')
    getTeamsWithPrecisedNumberOfPlayer(
        @Param('nbr') nbr: string): Promise<TeamInterface[]>{
        return this.TeamService.getTeamsWithPrecisedNumberOfPlayers(nbr);
    }
    @Get('free_slots/:nbr')
    getTeamsWithPrecisedFreePlaces(
        @Param('nbr') nbr: string): Promise<TeamInterface[]>{
        return this.TeamService.getTeamsWithPrecisedFreePlaces(nbr);
    }

    @Get('single/:id')
    getTeam(
        @Param('id') id: string): Promise<TeamDTO> {
        return this.TeamService.getTeam(parseInt(id));
        }

    @UseGuards(JwtAuthGuard)
    @Put('modify')
    
    updateTeam(
       
        @Req() req :any ){
        return this.TeamService.updateTeam(req.user.playerID, req.body);
        }

    @UseGuards(JwtAuthGuard)
    @Delete('delete')
    deleteTeam(
        @Req() req:any): Promise<DeleteResult> {
        return this.TeamService.deleteTeam(req.user.playerID);
        }




    
}