import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { Observable } from "rxjs";
import { TeamInterface } from "src/teams/models/teams.interface";
import { DeleteResult, UpdateResult } from "typeorm";
import { PlayerInterface } from "../models/player.interface";
import { Player } from "../models/players.entity";
import { PlayerInfo } from "../models/playerinfos.entity";
import { PlayersService } from "../providers/players.service";
import { PlayerInfoInterface } from "../models/playerinfos.interface";




@Controller('players')
export class PlayersController {

    constructor(private playersService: PlayersService){}

    @Post()
    addPlayer(
        @Body()player : PlayerInterface
    ) {
        this.playersService.createPlayer(player)
    }

    @Get('names')
    getAllPlayersName(): Promise<PlayerInterface[]> {
        return this.playersService.getAllNames();
    }
    

    @Get('allinfos')
    getAllPlayersWithInfos(): Promise<PlayerInterface[]>{
        return this.playersService.getAllInfosOfAllPlayers();
    }

    @Get('allinfos/:id')

    getPlayerWithInfos(
        @Param('id')idPlayer: number): Promise<PlayerInterface>{
            return this.playersService.getAllInfosOfOnePlayer(idPlayer);
    }

    @Put('new_name/:id')

    updatePlayerName(
        @Param('id')idPlayer: number,
        @Body()newName: PlayerInterface): Promise<UpdateResult>{
            return this.playersService.updateNameOfPlayer(idPlayer, newName);
    }


    @Put('new_infos/:id')

    updatePlayerAllInfos(
        @Param('id')idPlayer: number,
        @Body()newInfos: PlayerInfo ){
            return this.playersService.updateInformationsOfPlayer(idPlayer, newInfos);
    }

    @Patch('patch_infos/:id')
    updatePlayerFewInfos(
        @Param('id')idPlayer: number,
        @Body()newInfos: PlayerInfo){
            return this.playersService.patchInformationsOfPlayer(idPlayer, newInfos);
        }


    @Delete('delete/:id')
    deletePlayer(
        @Param('id')idPlayer: number){
            return this.playersService.deleteOnePlayer(idPlayer);
        }

    @Get('import')
    datasFromExcel(){
        return this.playersService.googleSheetDataToDB();        
    }


    
    
    
}