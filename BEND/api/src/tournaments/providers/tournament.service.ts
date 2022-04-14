import { Injectable, UnauthorizedException, UseFilters } from "@nestjs/common";
import { Matches } from "class-validator";
import { UserType } from "src/players/enum/userType.enum";
import { PlayerInterface } from "src/players/interfaces/player.interface";
import { PlayerRepository } from "src/players/repository/player/player.repository";
import { TeamRepository } from "src/teams/repository/teams.repository";
import { DeleteResult, UpdateResult } from "typeorm";
import { TournamentDTO } from "../DTO/tournamentDTO";
import { BestOfTypeEnum } from "../enum/bestOfType.enum";
import { TournamentInterface } from "../interfaces/tournament.interface";
import { TournamentMatchInterface } from "../interfaces/tournamentMatch.interface";
import { TournamentParticipationInterface } from "../interfaces/tournamentParticipation.interface";
import { TournamentMatch } from "../models/tournamentMatch.entity";
import { TournamentParticipation } from "../models/tournamentParticipation.entity";
import { Tournament } from "../models/tournaments.entity";
import { TournamentRepository } from "../repositories/tournament.repository";
import { TournamentMatchRepository } from "../repositories/tournamentMatch.repositoy";
import { TournamentParticipationRepository } from "../repositories/tournamentParticipation.repository";

@Injectable()
export class TournamentService {

    constructor(
        private tournamentRepository: TournamentRepository,
        private playerRepository: PlayerRepository,
        private teamRepository: TeamRepository,
        private tournamentParticipationRepository: TournamentParticipationRepository,
        private tournamentMatchRepository: TournamentMatchRepository,
    ) { }

    async createOne(adminId: number, createTournamentDTO: TournamentInterface): Promise<Tournament> {
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

    async startTournament(adminId: number, tournamentId: number): Promise<any> {
        try {
            const admin = await this.playerRepository.getOne(adminId);
            const tournament = await this.tournamentRepository.getOne(Number(tournamentId));
            const allParticipations = await this.tournamentParticipationRepository.getAllOfATournament(tournament.id);
            const allTeamsParticipating = [];
            console.log(allParticipations.length, tournament.seed);
            
            if(admin.userType !== UserType.ADMIN) {
                throw new UnauthorizedException();
            }
            else if(!tournament || allParticipations.length > tournament.seed ||  tournament.startDate > new Date() || tournament.startDate > tournament.endDate || tournament.areInscriptionsClosed  ) { 
                throw new UnauthorizedException("Tournament can't be started", "Le tournoi n'a pas pu être lancé pour ces possibles raisons :  Le tournoi n'existe pas, le tournoi a plus de participants que nécessaire, les dates ne conviennent pas ou les inscription sont fermées.");
            }
            tournament.areInscriptionsClosed = true;
            await this.tournamentRepository.saveOne(tournament);
            for(const participation of allParticipations) {
                allTeamsParticipating.push(participation.team);
            }
            let teamsToDistribute = [...allTeamsParticipating];
            for (const team of teamsToDistribute) {
                console.log(team.name);
            }
            for(let i = 0; i < (tournament.seed/2); i++) {
                let match = new TournamentMatch();
                let bothFigthers = [];
                for(let j= 0; j < 2; j ++) {
                    let fighter = teamsToDistribute[Math.floor(Math.random() * teamsToDistribute.length)];
                    bothFigthers.push(fighter);
                    const index = teamsToDistribute.indexOf(fighter);
                        if(index > -1) {
                            teamsToDistribute.splice(index, 1);
                        }
                }
                match.round = 1;
                match.bestOfType = BestOfTypeEnum.BO3;
                match.isOver = false;
                if(bothFigthers[0] && bothFigthers[1]){
                    console.log(bothFigthers[0].name,bothFigthers[1].name);
                }
                match.teamA = bothFigthers[0];
                match.teamB = bothFigthers[1];
                match.teamAWins = 0;
                match.teamBWins = 0;
                match.winner = null;
                match.order = i + 1;
                match.tournament = tournament;
                await this.tournamentMatchRepository.createOne(match);
            }            
            for(let j = 0; j < Math.log2(tournament.seed) - 1; j++) {
                let MatchesFromLastRound = await this.tournamentMatchRepository.getAllMatchesForARound(tournament.id, j+1);
                for(let k= 0; k < MatchesFromLastRound.length / 2; k ++) {
                    let newMatch = new TournamentMatch();
                    newMatch.round = k + 2;
                    newMatch.order = k + 1;
                    newMatch.tournament = tournament;
                    await this.tournamentMatchRepository.createOne(newMatch);
                }
            }
            
            return tournament;
        }
        catch(err) {
            throw err;
        }
    }

    async addParticipantAsAdmin(adminId: number, tournamentParticipation: any): Promise<TournamentParticipation> {
        try {
            const admin = await this.playerRepository.getOne(adminId);
            const teamToAdd = await this.teamRepository.getTeam(tournamentParticipation.team);
            const tournament = await this.tournamentRepository.getOne(tournamentParticipation.tournament);
            const tournamentAllParticipants = await this.tournamentParticipationRepository.getAllOfATournament(Number(tournament.id));
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


    async addParticipantAsCaptain(captainId: number, tournamentParticipation: any): Promise<TournamentParticipation> {
        try {
            const captain = await this.playerRepository.getOne(captainId);
            const teamToAdd = await this.teamRepository.getTeam(tournamentParticipation.team);
            const tournament = await this.tournamentRepository.getOne(tournamentParticipation.tournament);
            const teamAllParticipations = await this.tournamentParticipationRepository.getAllOfATeam(Number(teamToAdd.id));
            if(!captain.team || !captain.profile.isCaptain || captain.team.players.length > 5 || captain.team.id !== tournamentParticipation.team){
                throw new UnauthorizedException('Not authorized');
            }
            else if(tournament.participants && tournament.participants.length >= tournament.seed || tournament.areInscriptionsClosed) {
                throw new UnauthorizedException('Not authorized');
            }
            else if(teamAllParticipations.find(tournamentP => tournamentP.team.id === tournamentParticipation.team)) {
                throw new UnauthorizedException('Not authorized');
            }
            return await this.tournamentParticipationRepository.createOne(tournamentParticipation);
        }
        catch(err) {
            throw err;
        }
    }

    async getTournament(tournamentId: number): Promise<TournamentInterface> {
        try {
            return await this.tournamentRepository.getOne(tournamentId);
        }
        catch(err) {
            throw err;
        }
    }

    async getTournamentMatches(tournamentId: number): Promise<TournamentMatch[]> {
        try {
            return await this.tournamentRepository.getOneOnlyMatches(tournamentId);
        }
        catch(err) {
            throw err;
        }
    }

    async getMatchesByRound(tournamentId: number, round: number): Promise<TournamentMatchInterface[]> {
        try {
            return await this.tournamentMatchRepository.getAllMatchesForARound(tournamentId, round);
        }
        catch(err) {
            throw err;
        }
    }

    async getAll(): Promise<TournamentParticipation[]> {
        try {
            return await this.tournamentParticipationRepository.getAll();
        }
        catch(err) {
            throw err;
        }
    }

    async getAllOfATournament(tournamentId: number): Promise<TournamentParticipation[]> {
        try {
            return await this.tournamentParticipationRepository.getAllOfATournament(tournamentId);
        }
        catch(err) {
            throw err;
        }
    }

    async getAllOfATeam(askerId: number, teamId: number): Promise<TournamentParticipation[]> {
        try {
            const asker = await this.playerRepository.getOne(askerId);
            if(!asker || !asker.team || asker.team.id !== teamId) {
                throw new UnauthorizedException();
            }
            return await this.tournamentParticipationRepository.getAllOfATeam(Number(teamId));
        }
        catch(err) {
            throw err;
        }
    }

    async updateMatchScore(adminId: number,tournamentId: number, matchId: number, newMatchScore: any): Promise<any> {
        try {
            const admin = await this.playerRepository.getOne(adminId);
            const match = await this.tournamentMatchRepository.getOne(matchId);
            const matches = await this.tournamentRepository.getOneOnlyMatches(tournamentId);
            let nextMatchForWinner;
            if(admin.userType !== UserType.ADMIN) {
                throw new UnauthorizedException();
            }
            if(match.isOver || match.winner || !match || !matches.find(m => m.id === match.id) || (newMatchScore.teamAWins === match.bestOfType && newMatchScore.teamBWins === match.bestOfType) || newMatchScore.teamAWins > match.bestOfType || newMatchScore.teamBWins > match.bestOfType) {
                throw new UnauthorizedException("Match score can't be updated", "Le score ne peut être modifié car soit le match n'existe pas, soit le match est terminé.");
            }
            match.teamAWins = newMatchScore.teamAWins;
            match.teamBWins = newMatchScore. teamBWins;
            await this.tournamentMatchRepository.saveOne(match);
            if(newMatchScore.teamAWins === match.bestOfType || newMatchScore.teamBWins === match.bestOfType) {
                match.isOver = true;
                match.teamAWins === match.bestOfType ? match.winner = match.teamA : match.winner = match.teamB;
                nextMatchForWinner = matches.find(nm => nm.round === match.round + 1 && nm.order === Math.ceil(match.order/2))
                await this.tournamentMatchRepository.saveOne(match);
                if(nextMatchForWinner.teamA === null && nextMatchForWinner.teamB === null) {
                    nextMatchForWinner.teamA = match.winner;
                    return await this.tournamentMatchRepository.saveOne(nextMatchForWinner);
                }
                if(nextMatchForWinner.teamA !== null && nextMatchForWinner.teamB === null && nextMatchForWinner.teamA !== match.winner) {
                    nextMatchForWinner.teamB = match.winner;
                    return await this.tournamentMatchRepository.saveOne(nextMatchForWinner);
                }           
            }
            return match;
        }
        catch(err) {
            throw err;
        }
    }

    async deleteAParticpantAsAdmin(adminId: number, tournamentParticipationId: number): Promise<DeleteResult> {
        try {
            const admin = await this.playerRepository.getOne(adminId);
            if(admin.userType !== UserType.ADMIN) {
                throw new UnauthorizedException();
            }
            return await this.tournamentParticipationRepository.deleteOne(tournamentParticipationId);
        }
        catch(err) {
            throw err;
        }
    }

    async leaveTournament(captainId: number, tournamentParticipationId: number) : Promise<DeleteResult> {
        try {
            const captain = await this.playerRepository.getOne(captainId);
            console.log(typeof(tournamentParticipationId));
            const tournamentParticipationToDelete = await this.tournamentParticipationRepository.getOne(tournamentParticipationId);

            if(!captain.team || !captain.profile.isCaptain || captain.team.id !== tournamentParticipationToDelete.team.id || !tournamentParticipationToDelete){
                throw new UnauthorizedException('Not authorized');
            }
            return await this.tournamentParticipationRepository.deleteOne(tournamentParticipationToDelete.id);
        }
        catch(err) {
            throw err;
        }
    }

    filterNextMatch(previousMatch, nextMatch): boolean {
        if(nextMatch.round === (previousMatch.round +1)  ) {
            return false;
        }
        return true;
    }
}


