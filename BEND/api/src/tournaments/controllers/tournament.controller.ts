import { Controller, Delete, Get, Param, Post, Put, Req, UnauthorizedException, UseGuards } from "@nestjs/common";
import { DeleteResult, UpdateResult } from "typeorm";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { TournamentDTO } from "../DTO/tournamentDTO";
import { TournamentMatchDTO } from "../DTO/tournamentMatchDTO";
import { TournamentParticipantsDTO } from "../DTO/tournamentParticipantsDTO";
import { TournamentMatch } from "../models/tournamentMatch.entity";
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
        @Req() req:any): Promise<Tournament | UnauthorizedException> {
    return this.tournamentService.createOne(req.user.playerID, req.body);
    }

    @UseGuards(JwtAuthGuard)
    @Post('add_participant')
    addParticipant(
        @Req() req:any): Promise<TournamentParticipation | UnauthorizedException> {
    return this.tournamentService.addParticipantAsAdmin(req.user.playerID, req.body);
    }

    @UseGuards(JwtAuthGuard)
    @Post('register')
    registerToTournament(
        @Req() req:any): Promise<TournamentParticipation | UnauthorizedException> {
    return this.tournamentService.addParticipantAsCaptain(req.user.playerID, req.body);
    }

    @UseGuards(JwtAuthGuard)
    @Post('start')
    startTournament(
        @Req() req:any): Promise<any | UnauthorizedException> {
    return this.tournamentService.startTournament(req.user.playerID, req.body.tournament);
        }
    
    @Get('all')
    getAllTournaments(): Promise<TournamentDTO[] | null> {
        return this.tournamentService.getAllTournaments();
    }

    @UseGuards(JwtAuthGuard)
    @Get('my_team')
    getAllOfMyTeam(
        @Req() req:any): Promise<TournamentDTO[] | null | UnauthorizedException> {
        return this.tournamentService.getAllOfATeam(req.user.playerID, req.body.team);
    }

    @Get(':id/matches')
    getAllMatchesOfMyTeam(
        @Param('id') id: number): Promise<TournamentMatchDTO[] | null> {
        return this.tournamentService.getAllMatchesOfTeam(id);
    }

    @Get('/:id')
    getTournament(
        @Param('id') id:number): Promise<Tournament | undefined> {
        return this.tournamentService.getTournament(id);
    }

    @Get(':id/matches')
    getTournamentMatches(
        @Param('id') id:number): Promise<TournamentMatch[] | null> {
        return this.tournamentService.getTournamentMatches(id);
        }

    

    @Get('all/participations')
    getAllParticipations(): Promise<TournamentParticipation[] | null> {
        return this.tournamentService.getAllPartcipations();
    }

    @Get(':id/round/:round_id')
    getMatchesByRound(
        @Param('id') id:number,
        @Param('round_id') round_id:number): Promise<TournamentMatch[] | null> {
        return this.tournamentService.getMatchesByRound(id, round_id);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':tournament/matches/:id/update/score')
    updateMatchScore(
        @Param('tournament') tournament: number,
        @Param('id') id:number,
        @Req() req:any): Promise<any | UnauthorizedException> {
        return this.tournamentService.updateMatchScore(req.user.playerID,tournament, id, req.body);
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

    @Get('/:id/participants')
    getAllParticipantsOfATournament(
        @Param('id') tournamentId:number): Promise<TournamentParticipantsDTO[] | null> {
        return this.tournamentService.getAllOfATournament(tournamentId);
    }
}