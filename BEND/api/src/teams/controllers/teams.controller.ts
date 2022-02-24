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

    @Post()
    addTeam(
        @Body()team : TeamInterface) {
        this.TeamService.createTeam(team)
    }

    @Get()
    getAllTeamsName(): Promise<Team[]> {
        return this.TeamService.getAllTeamsNames()    
    }

    @Get('players')
    getAllPlayersWithTeamInclude(): Promise<Team[]>{
        return this.TeamService.getAllPlayersWithTeam();
        
    }



    
}