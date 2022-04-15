
import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreatePlayerDTO } from 'src/players/DTO/player/CreatePlayerDTO';
import { PlayerDTO } from 'src/players/DTO/player/playerDTO';
import { PlayerInterface } from 'src/players/interfaces/player.interface';
import { Player } from 'src/players/models/player/player.entity';
import { PlayersService } from 'src/players/providers/player/player.service';
import { DeleteResult, UpdateResult } from 'typeorm';
import { FreePlayerDTO } from '../../DTO/player/freePlayerDTO';

@Controller('players')
export class PlayersController {

    constructor(
        private readonly PlayersService : PlayersService
    ) {}

    @Post()
    create(
        @Body() player: CreatePlayerDTO): Promise<Player> {
        return this.PlayersService.create(player);
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

    @Get('free')
    getAllFree(): Promise<FreePlayerDTO[]> {
        return this.PlayersService.getAllFree();
    }

    @Get('count_players')
    getNumberOfPlayer(): Promise<number> {
        return this.PlayersService.getNumberOfPlayer();
    }

    @Post('all_by_role')
    getAllByRoleAndFree(
    @Req() req: any): Promise<Player[]> {
        return this.PlayersService.getAllByRoleAndFree(req.body.role);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id/modify')
    update(
        @Param('id') id:number,
        @Req() req: any): Promise<UpdateResult | UnauthorizedException> {
        return this.PlayersService.patchPlayer(req.user.playerID, id, req.body);
    } 

    @UseGuards(JwtAuthGuard)
    @Patch('modify_profile/:id')
    updateProfil(
        @Param() id:number,
        @Req() req:any): Promise<UpdateResult | UnauthorizedException> {
        return this.PlayersService.updateProfile(req.user.playerID, id, req.body);
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
        @Param('id') idPlayer: number,
        @Req() req:any): Promise<DeleteResult | UnauthorizedException> {
        return this.PlayersService.delete(req.user.playerID, idPlayer);
    }
}