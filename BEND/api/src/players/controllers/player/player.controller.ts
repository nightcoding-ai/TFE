
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreatePlayerDTO } from 'src/players/DTO/player/CreatePlayerDTO';
import { PlayerDTO } from 'src/players/DTO/player/playerDTO';
import { PlayersService } from 'src/players/providers/player/player.service';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('players')
export class PlayersController {

    constructor(
        private readonly PlayersService : PlayersService
    ) {}

    @Post()
    create(
        @Body() playerDTO: CreatePlayerDTO): Promise<void> {
        return this.PlayersService.create(playerDTO);
  }

    @Delete('delete/:id')
    delete(
        @Param('id') idPlayer: number): Promise<DeleteResult> {
        return this.PlayersService.delete(idPlayer);
      }

    @Get('single/:id')
    
    getOne(
        @Param('id') idPlayer: number): Promise<PlayerDTO> {
        return this.PlayersService.getOne(idPlayer);
       }
    
    @Get('all')
    getAll(): Promise<PlayerDTO[]> {
        return this.PlayersService.getAll();
    }

    
    
    @Put('modify/:id')
    update(
        @Param() idPlayer: number,
        @Body() playerDTO: PlayerDTO) {
            return this.PlayersService.update(idPlayer, playerDTO);
        }

}