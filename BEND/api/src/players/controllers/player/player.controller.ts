
import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreatePlayerDTO } from 'src/players/DTO/player/CreatePlayerDTO';
import { PlayerDTO } from 'src/players/DTO/player/playerDTO';
import { PlayerInterface } from 'src/players/interfaces/player.interface';
import { Player } from 'src/players/models/player/player.entity';
import { PlayersService } from 'src/players/providers/player/player.service';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('players')
export class PlayersController {

    constructor(
        private readonly PlayersService : PlayersService
    ) {}

    @Post()
    create(
        @Body() player: PlayerDTO): Promise<PlayerInterface> {
        return this.PlayersService.create(player);
    }

    @Get('single/:id')
    getOne(
        @Param('id') idPlayer: number): Promise<PlayerDTO> {
        return this.PlayersService.getOne(idPlayer);
    }
    
    @UseGuards(JwtAuthGuard)
    @Get('all')
    getAll(
        @Req() req: any): Promise<PlayerInterface[]> {
        return this.PlayersService.getAll(req.user.playerID);
    }

    @Get('free')
    getAllFree(): Promise<PlayerInterface[]> {
        return this.PlayersService.getAllFree();
    }

    @Get('count_players')
    getNumberOfPlayer(): Promise<number> {
        return this.PlayersService.getNumberOfPlayer();
    }

    @Post('all_by_role')
    getAllByRoleAndFree(
    @Req() req: any): Promise<PlayerInterface[]> {
        return this.PlayersService.getAllByRoleAndFree(req.body.role);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('modify')
    update(
        @Req() req: any) {
        return this.PlayersService.patchPlayer(req.user.playerID, req.body);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('modify_profile')
    updateProfil(
        @Req() req:any) {
        return this.PlayersService.updateProfile(req.user.playerID, req.body);
    }



    @UseGuards(JwtAuthGuard)
    @Delete('leave_team')
    leaveTeam(
    @Req() req:any) {
        return this.PlayersService.leaveTeam(req.user.playerID);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    delete(
        @Param('id') idPlayer: number): Promise<DeleteResult> {
        return this.PlayersService.delete(idPlayer);
    }

    
}