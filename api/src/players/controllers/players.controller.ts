import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Observable } from "rxjs";
import { PlayerInterface } from "../models/player.interface";
import { PlayersService } from "../providers/players.service";




@Controller('players')
export class PlayersController {

    constructor(private playersService: PlayersService){}


    @Get('all')
    getPlayers(): Observable<PlayerInterface[]>{
        return this.playersService.getAllPlayers();
    }

    @Get(':id')
    getPlayer(
        @Param() player : PlayerInterface): Observable<PlayerInterface>{
        return this.playersService.getSinglePlayer(player.idPlayer); 
    }

    @Post()
    create(@Body() player: PlayerInterface) {
        return this.playersService.createPlayer(player);
    }

    @Put()
    updatePlayer(){}

    @Delete()
    deletePlayer(){}

}