import { Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { DeleteResult, UpdateResult } from "typeorm";
import { threadId } from "worker_threads";
import { TournamentInterface } from "../interfaces/tournament.interface";
import { TournamentMatchInterface } from "../interfaces/tournamentMatch.interface";
import { TournamentParticipationInterface } from "../interfaces/tournamentParticipation.interface";
import { TournamentParticipation } from "../models/tournamentParticipation.entity";
import { Tournament } from "../models/tournaments.entity";
import { TournamentService } from "../providers/tournament.service";


@Controller('tournaments')
export class TournamentsController {

    constructor(
        private tournamentService : TournamentService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(
        @Req() req:any): Promise<Tournament> {
    return this.tournamentService.createOne(req.user.playerID, req.body);
    }

    @UseGuards(JwtAuthGuard)
    @Post('add_participant')
    addParticipant(
        @Req() req:any): Promise<TournamentParticipation> {
    return this.tournamentService.addParticipantAsAdmin(req.user.playerID, req.body);
    }

    @UseGuards(JwtAuthGuard)
    @Post('register')
    registerToTournament(
        @Req() req:any): Promise<TournamentParticipation> {
    return this.tournamentService.addParticipantAsCaptain(req.user.playerID, req.body);
    }

    @UseGuards(JwtAuthGuard)
    @Post('start')
    startTournament(
        @Req() req:any): Promise<any> {
    return this.tournamentService.startTournament(req.user.playerID, req.body.tournament);
        }

    @UseGuards(JwtAuthGuard)
    @Get('my_team')
    getAllOfMyTeam(
        @Req() req:any): Promise<TournamentParticipation[]> {
    return this.tournamentService.getAllOfATeam(req.user.playerID, req.body.team);
    }

    @Get('/:id')
    getTournament(
        @Param('id') id:number): Promise<TournamentInterface> {
    return this.tournamentService.getTournament(id);
    }

    @Get(':id/matches')
    getTournamentMatches(
        @Param('id') id:number): Promise<TournamentMatchInterface[]> {
    return this.tournamentService.getTournamentMatches(id);
        }

    @Get('all')
    getAll(): Promise<TournamentParticipation[]> {
    return this.tournamentService.getAll();
    }

    @Get(':id/round/:round_id')
    getMatchesByRound(
        @Param('id') id:number,
        @Param('round_id') round_id:number): Promise<TournamentMatchInterface[]> {
    return this.tournamentService.getMatchesByRound(id, round_id);
    }

    @UseGuards(JwtAuthGuard)
    @Put('matches/:id/update/score')
    updateMatchScore(
        @Param('id') id:number,
        @Req() req:any): Promise<UpdateResult> {
    return this.tournamentService.updateMatchScore(req.user.playerID, id, req.body);
        }

    @UseGuards(JwtAuthGuard)
    @Delete('delete')
    deleteAParticipantAsAdmin(
        @Req() req:any): Promise<DeleteResult> {
    return this.tournamentService.deleteAParticpantAsAdmin(req.user.playerID, req.body.tournamentParticipation);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('leave')
    leaveTournament(
        @Req() req:any): Promise<DeleteResult> {
    return this.tournamentService.leaveTournament(req.user.playerID, req.body.tournamentParticipation);
    }

    @Get('/:id')
    getAllParticipantsOfATournament(
        @Param('id') tournamentId:number): Promise<TournamentParticipation[]> {
    return this.tournamentService.getAllOfATournament(tournamentId);
    }

}