
import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { CreatePlayerDTO } from '../../DTO/player/CreatePlayerDTO';
import { FreePlayerDTO } from '../../DTO/player/freePlayerDTO';
import { PlayerDTO } from '../../DTO/player/playerDTO';
import { PlayerProfileDTO } from '../../DTO/player/PlayerProfileDTO';
import { Player } from '../../models/player/player.entity';
import { PlayersService } from '../../providers/player/player.service';

@Controller('players')
export class PlayersController {

    constructor(
        private readonly PlayersService : PlayersService
    ) {}

    @Post()
    create(
        @Body() player: CreatePlayerDTO): Promise<Player> {
        return this.PlayersService.createAPlayer(player);
    }

    @UseGuards(JwtAuthGuard)
    @Get('my_profile')
    getMyProfileInformations(
        @Req() req: any): Promise<PlayerProfileDTO> {
        return this.PlayersService.myProfile(req.user.playerID);
    }

    @Get('single/:id')
    getOne(
        @Param('id') idPlayer: number): Promise<Player> {
        return this.PlayersService.getOne(idPlayer);
    }
    
    @Get('all')
    getAll(): Promise<PlayerDTO[]> {
        return this.PlayersService.getAllPlayers();
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