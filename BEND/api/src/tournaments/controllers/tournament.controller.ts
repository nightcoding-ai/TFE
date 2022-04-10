import { Controller, Post, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { TournamentInterface } from "../interfaces/tournament.interface";
import { TournamentParticipationInterface } from "../interfaces/tournamentParticipation.interface";
import { TournamentService } from "../providers/tournament.service";


@Controller('tournaments')
export class TournamentsController {

    constructor(
        private tournamentService : TournamentService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(
        @Req() req:any): Promise<TournamentInterface> {
    return this.tournamentService.createOne(req.user.playerID, req.body);
    }

    @UseGuards(JwtAuthGuard)
    @Post('add_participant')
    addParticipant(
        @Req() req:any): Promise<TournamentParticipationInterface> {
    return this.tournamentService.addParticipantAsAdmin(req.user.playerID, req.body);
    }

    @UseGuards(JwtAuthGuard)
    @Post('register')
    registerToTournament
    
}