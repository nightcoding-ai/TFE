import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserType } from "src/players/enum/userType.enum";
import { PlayerInterface } from "src/players/interfaces/player.interface";
import { PlayerRepository } from "src/players/repository/player/player.repository";
import { TeamRepository } from "src/teams/repository/teams.repository";
import { TournamentInterface } from "../interfaces/tournament.interface";
import { TournamentParticipationInterface } from "../interfaces/tournamentParticipation.interface";
import { TournamentRepository } from "../repositories/tournament.repository";
import { TournamentParticipationRepository } from "../repositories/tournamentParticipation.repository";

@Injectable()
export class TournamentService {

    constructor(
        private tournamentRepository: TournamentRepository,
        private playerRepository: PlayerRepository,
        private teamRepository: TeamRepository,
        private tournamentParticipationRepository: TournamentParticipationRepository
    ) { }

    async createOne(adminId: number, createTournamentDTO: TournamentInterface ): Promise<TournamentInterface> {
        try {
            const admin = await this.playerRepository.getOne(adminId);
            if(admin.userType !== UserType.ADMIN) {
                throw new UnauthorizedException();
            }
            return await this.tournamentRepository.createOne(createTournamentDTO);
        }
        catch(err) {
            throw err;
        }
    }

    async addParticipantAsAdmin(adminId: number, tournamentParticipation: any): Promise<TournamentParticipationInterface> {
        try {
            const admin = await this.playerRepository.getOne(adminId);
            const teamToAdd = await this.teamRepository.getTeam(tournamentParticipation.teamId);
            const tournament = await this.tournamentRepository.getOne(tournamentParticipation.tournamentId);
            const tournamentAllParticipants = await this.tournamentParticipationRepository.getAllOfATournament(tournament.id);
            if(admin.userType !== UserType.ADMIN  || teamToAdd.players.length < 5) { 
                throw new UnauthorizedException();
            }
            else if(tournament.participants && tournament.participants.length >= tournament.seed){
                throw new UnauthorizedException();
            }
            else if(tournamentAllParticipants.find(tournamentP => tournamentP.team.id === tournamentParticipation.team)){
                throw new UnauthorizedException();
            }
            return await this.tournamentParticipationRepository.createOne(tournamentParticipation);
        }
        catch(err) {
            throw err;
        }
    }

    async addParticipantAsCaptain(captainId: number, tournamentParticipation: any): Promise<TournamentParticipationInterface> {
        try {
            const captain = await this.playerRepository.getOne(captainId);
            const teamToAdd = await this.teamRepository.getTeam(tournamentParticipation.teamId);
            const tournament = await this.tournamentRepository.getOne(tournamentParticipation.tournamentId);
            const teamAllParticipations = await this.tournamentParticipationRepository.getAllOfATeam(teamToAdd.id);
            if(!captain.team || !captain.profile.isCaptain || captain.team.players.length > 5){
                throw new UnauthorizedException('5', "erreur");
            }
            else if(tournament.participants && tournament.participants.length >= tournament.seed) {
                throw new UnauthorizedException('5', "erreur");
            }
            else if(teamAllParticipations.find(tournamentP => tournamentP.team.id === tournamentParticipation.team)) {
                throw new UnauthorizedException('5', "erreur");
            }
            return await this.tournamentParticipationRepository.createOne(tournamentParticipation);
        }
        catch(err) {
            throw err;
        }
    }
}