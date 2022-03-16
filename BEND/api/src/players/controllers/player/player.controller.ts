
import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
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

    @UseGuards(JwtAuthGuard)
    @Post('all_by_role')
    getAllByRole(
    @Req() req: any): Promise<PlayerDTO[]> {
        return this.PlayersService.getAllByRole(req.body.role);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('leave_team')
    leaveTeam(
    @Req() req:any) {
        return this.PlayersService.leaveTeam(req.user.playerID);
    }

    @UseGuards(JwtAuthGuard)
    @Post('leave_team_as_captain')
    
    

    
    @UseGuards(JwtAuthGuard)
    @Put('modify_name')
    update(
        @Req() req: any) {
        return this.PlayersService.update(req.user.playerID, req.body);
    }

    @UseGuards(JwtAuthGuard)
    @Put('modify_profile')
    updateProfil(
        @Req() req:any) {
        return this.PlayersService.updateProfile(req.user.playerID, req.body);
    }
}