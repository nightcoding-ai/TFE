import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserType } from "src/players/enum/userType.enum";
import { PlayerInterface } from "src/players/interfaces/player.interface";
import { PlayerRepository } from "src/players/repository/player/player.repository";
import { TeamRepository } from "src/teams/repository/teams.repository";
import { DeleteResult } from "typeorm";
import { TournamentDTO } from "../DTO/tournamentDTO";
import { TournamentInterface } from "../interfaces/tournament.interface";
import { TournamentParticipationInterface } from "../interfaces/tournamentParticipation.interface";
import { TournamentParticipation } from "../models/tournamentParticipation.entity";
import { Tournament } from "../models/tournaments.entity";
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
            const allParticipations = await this.tournamentParticipationRepository.getAllOfATournament(Number(tournamentId));
            const allTeamsParticipating = [];
            const matches = [];


            for (const participation of allParticipations) {
                allTeamsParticipating.push(participation.team);
            }

            if(admin.userType !== UserType.ADMIN) {
                throw new UnauthorizedException();
            }
            else if(!tournament || allParticipations.length > tournament.seed ||  tournament.startDate > new Date() || tournament.areInscriptionsClosed) { //tournament.startDate > tournament.endDate ||
                throw new UnauthorizedException("Tournament can't be started", "Le tournoi n'a pas pu être lancé pour ces possibles raisons :  Le tournoi n'existe pas, le tournoi a plus de participants que nécessaire, les dates ne conviennent pas.");
            }
            let teamsToDistribute = [...allTeamsParticipating];
            for(let i= 0; i < (tournament.seed/2); i++) {
                let matchUp = [];
                for(let i= 0; i < 2; i ++) {
                let match = teamsToDistribute[Math.floor(Math.random() * teamsToDistribute.length)];
                matchUp.push(match);
                const index = teamsToDistribute.indexOf(match);
                if(index > -1) {
                    teamsToDistribute.splice(index, 1);
                }
                }
                matches.push(matchUp);
            }
            return matches;
            
            tournament.areInscriptionsClosed = true;
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
}