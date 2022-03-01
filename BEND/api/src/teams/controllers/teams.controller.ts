import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { Observable } from "rxjs";
import { Player } from "src/players/models/players.entity";
import { DeleteResult, UpdateResult } from "typeorm";
import { runInThisContext } from "vm";
import { Team } from "../models/teams.entity";
import { TeamInterface } from "../models/teams.interface";
import { TeamsService } from "../providers/teams.service";



@Controller('teams')
export class TeamsController {

    constructor(
        private TeamService : TeamsService
    ){}

    @Post('/post')
    addTeam(
        @Body()team : Team) {
        this.TeamService.createTeam(team);
    }

    @Get('/getall')
    getAllTeamsName(): Promise<Team[]> {
        return this.TeamService.getAllTeams();
    }

    @Get('/profil_team/:id')
    getTeamByIdWithPlayers(
        @Param('id')idTeam: number): Promise<Team> {
        return this.TeamService.getTeamByID(idTeam);
        }

    @Get('/getall/players')
    getAllPlayersWithTeamInclude(): Promise<Team[]> {
        return this.TeamService.getAllPlayersWithTeam();
        
    }

    @Put('/modify/:id')
    putTeam(
        @Param('id')idTeam: number,
        @Body()team: Team): Promise<UpdateResult> {
        return this.TeamService.updateTeam(idTeam, team);
    }

    @Delete('/delete/:id')
    deleteTeam(
        @Param('id')idTeam: number): Promise<DeleteResult> {
        return this.TeamService.deleteTeam(idTeam);
        }



    
}