import { Body, Controller, Get, Post } from "@nestjs/common";
import { TeamInterface } from "../models/teams.interface";
import { TeamsService } from "../providers/teams.service";







@Controller('teams')
export class TeamsController {
    constructor(private teamsService: TeamsService){}

    @Get()
    getAllTeams(){}

    @Get()
    getSingleTeam(){}

    @Post()
    create(@Body() team: TeamInterface) {
        return this.teamsService.createTeam(team);
    }
}