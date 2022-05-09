import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { DeleteResult, UpdateResult } from "typeorm";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { Player } from "../../players/models/player/player.entity";
import { FullTeamDTO } from "../DTO/fullTeamDTO";
import { NotFullTeamDTO } from "../DTO/notFullTeamDTO";
import { TeamDTO } from "../DTO/teamDTO";
import { TeamWithLogoDTO } from "../DTO/teamWithLogoDTO";
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
        @Req() req: any): Promise<number> {
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
        @Req() req:any): Promise<Player> {
        return this.TeamService.setAsCaptain(req.user.playerID, req.body.idPlayer);
    }
    
    @Get()
    getAllWithLogos(): Promise<TeamWithLogoDTO[] | null> {
        return this.TeamService.getAllWithLogos();
    }

    @UseGuards(JwtAuthGuard)
    @Get('all')
    getAll(
        @Req() req:any): Promise<TeamDTO[] | null> {
        return this.TeamService.getAll(req.user.playerID);
    }

    @Get(':id/tournaments_Won')
    getNumberOfTournamentsWon(
        @Param('id') id: number): Promise<number> {
        return this.TeamService.getNumberOfTournamentsWon(id);
    }

    @Get('count_teams')
    getNumberOfTeams(): Promise<number> {
        return this.TeamService.getNumberOfTeams();
    }

    @Get('full')
    getFullTeams(): Promise<FullTeamDTO[] | null> {
        return this.TeamService.getFullTeams();
    }

    @Get('not_full')
    getNotFullTeams(): Promise<NotFullTeamDTO[] | null> {
        return this.TeamService.getNotFullTeams();
    }

    @Get('with/:nbr')
    getTeamsWithPrecisedNumberOfPlayer(
        @Param('nbr') nbr: string): Promise<Team[] | null>{
        return this.TeamService.getTeamsWithPrecisedNumberOfPlayers(nbr);
    }
    @Get('free_slots/:nbr')
    getTeamsWithPrecisedFreePlaces(
        @Param('nbr') nbr: string): Promise<Team[] | null>{
        return this.TeamService.getTeamsWithPrecisedFreePlaces(nbr);
    }

    @Get('single/:id')
    getTeam(
        @Param('id') id: string): Promise<TeamDTO | undefined> {
        return this.TeamService.getTeam(parseInt(id));
    }

    @UseGuards(JwtAuthGuard)
    @Put('modify')
    updateTeam(
        @Req() req :any ): Promise<UpdateResult> {
        return this.TeamService.updateTeam(req.user.playerID, req.body);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete')
    deleteTeam(
        @Req() req:any): Promise<DeleteResult> {
        return this.TeamService.deleteTeam(req.user.playerID);
    }
}