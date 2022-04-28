import { Injectable, UnauthorizedException, UseFilters } from "@nestjs/common";
import { DeleteResult, UpdateResult } from "typeorm";
import { UserType } from "../../players/enum/userType.enum";
import { PlayerRepository } from "../../players/repository/player/player.repository";
import { TeamRepository } from "../../teams/repository/teams.repository";
import { createTournamentDTO } from "../DTO/createTournamentDTO";
import { TournamentDTO } from "../DTO/tournamentDTO";
import { TournamentMatchDTO } from "../DTO/tournamentMatchDTO";
import { TournamentParticipantsDTO } from "../DTO/tournamentParticipantsDTO";
import { BestOfTypeEnum } from "../enum/bestOfType.enum";
import { TournamentInterface } from "../interfaces/tournament.interface";
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

    /**
     * Fonction qui permet de créer un nouveau tournoi en tant qu'administrateur.
     * @param {number} adminId - L'id de l'administrateur afin de vérifier si celui-ci est bien administrateur.
     * @param {createTournamentDTO} createTournamentDTO - L'objet représentant un nouveau tournoi.
     * @returns {Tournament | UnauthorizedException} le nouveau tournoi ou une erreur 401 si la personne n'est pas administrateur.
     */
    async createOne(adminId: number, createTournamentDTO: TournamentInterface): Promise<Tournament | UnauthorizedException> {
        try {
            const admin = await this.playerRepository.getOne(adminId);
            if(admin.userType !== UserType.ADMIN) {
                return new UnauthorizedException();
            }
            return await this.tournamentRepository.createOne(createTournamentDTO);
        }
        catch(err) {
            throw err;
        }
    }

    /**
     * Fonction qui permet de commencer un tournoi, vérifiant d'abord que la personne voulant commmencer le tournoi est bien administrateur.
     * Le tournoi ne peut commencer que si il y a le nombre précis de participants, dépendant du seed du tournoi. Si  le bon nombre est atteint, la fonction va générer les matchs en mélangeant aléatoirement les équipes.
     * De plus des matchs vides sont générées pour faciliter les fins de matchs.
     * @param {number} adminId - L'id de l'administrateur pour vérifier si celui-ci a bien le droit pour lancer le tournoi. 
     * @param {number} tournamentId - L'id du tournoi qu'il faut commencer. 
     * @returns {Tournament | UnauthorizedException} le tournoi est retourné ou une erreur 401 si le joueur n'est pas administrateur.
     */
    async startTournament(adminId: number, tournamentId: number): Promise<Tournament | UnauthorizedException> {
        try {
            const admin = await this.playerRepository.getOne(adminId);
            const tournament = await this.tournamentRepository.getOne(Number(tournamentId));
            const allParticipations = await this.tournamentParticipationRepository.getAllOfATournament(tournament.id);
            const allTeamsParticipating = [];            
            if(admin.userType !== UserType.ADMIN) {
                return  new UnauthorizedException();
            }
            else if(!tournament || allParticipations.length !== tournament.seed ||  tournament.startDate > new Date() || tournament.startDate > tournament.endDate || tournament.areInscriptionsClosed   ) { // tournament.startDate > tournament.endDate || ||  tournament.areInscriptionsClosed
                throw new UnauthorizedException("Tournament can't be started", "Le tournoi n'a pas pu être lancé pour ces possibles raisons :  Le tournoi n'existe pas, le tournoi a plus de participants que nécessaire, les dates ne conviennent pas ou les inscription sont fermées.");
            }
            tournament.areInscriptionsClosed = true;
            await this.tournamentRepository.saveOne(tournament);
            for(const participation of allParticipations) {
                allTeamsParticipating.push(participation.team);
            }
            let teamsToDistribute = [...allTeamsParticipating];
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
                    newMatch.round = MatchesFromLastRound[0].round + 1;
                    if(newMatch.round === Math.log2(tournament.seed)) {
                        newMatch.bestOfType = BestOfTypeEnum.BO5;
                    }
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

    /**
     * La fonction permet de rajouter une équipe au tournoi en tant qu'administrateur.
     * @param {number} adminId - L'id de l'administrateur qui souhaite lancer le tournoi.
     * @param {any} tournamentParticipation - Objet représentant la participation au tournoi, avec l'id du tournoi et l'id de l'équipe.
     * @returns {TournamentParticipation | UnauthorizedException} la nouvelle participation créée ou une erreur 401 si la personne n'est pas administrateur.
     */
    async addParticipantAsAdmin(adminId: number, tournamentParticipation: any): Promise<TournamentParticipation | UnauthorizedException> {
        try {
            const admin = await this.playerRepository.getOne(adminId);
            const teamToAdd = await this.teamRepository.getTeam(tournamentParticipation.team);
            const tournament = await this.tournamentRepository.getOne(tournamentParticipation.tournament);
            const tournamentAllParticipants = await this.tournamentParticipationRepository.getAllOfATournament(Number(tournament.id));
            if(admin.userType !== UserType.ADMIN  || teamToAdd.players.length < 5) { 
                return new UnauthorizedException();
            }
            else if(tournament.participants && tournament.participants.length >= tournament.seed){
                return new UnauthorizedException();
            }
            else if(tournamentAllParticipants.find(tournamentP => tournamentP.team.id === tournamentParticipation.team)){
                return new UnauthorizedException();
            }
            return await this.tournamentParticipationRepository.createOne(tournamentParticipation);
        }
        catch(err) {
            throw err;
        }
    }

    /**
     * fonction qui permet d'inscrire son équipe à un tournoi.
     * @param {number} captainId - L'id du capitaine de l'équipe qui veut s'incrire au tournoi. 
     * @param {any} tournamentParticipation - L'objet représentant la nouvelle participation à créer. 
     * @returns {TournamentParticipation | UnauthorizedException} la nouvelle participation ou une erreur 401 si le capitaine/joueur ou son équipe ne respecte pas les conditions.
     */
    async addParticipantAsCaptain(captainId: number, tournamentParticipation: any): Promise<TournamentParticipation | UnauthorizedException> {
        try {
            const captain = await this.playerRepository.getOne(captainId);
            const teamToAdd = await this.teamRepository.getTeam(tournamentParticipation.team);
            const tournament = await this.tournamentRepository.getOne(tournamentParticipation.tournament);
            const teamAllParticipations = await this.tournamentParticipationRepository.getAllOfATeam(Number(teamToAdd.id));
            if(!captain.team || !captain.profile.isCaptain || captain.team.players.length > 5 || captain.team.id !== tournamentParticipation.team){
                return new UnauthorizedException('Not authorized');
            }
            else if(tournament.participants && tournament.participants.length >= tournament.seed || tournament.areInscriptionsClosed) {
                return new UnauthorizedException('Not authorized');
            }
            else if(teamAllParticipations.find(tournamentP => tournamentP.team.id === tournamentParticipation.team)) {
                return new UnauthorizedException('Not authorized');
            }
            return await this.tournamentParticipationRepository.createOne(tournamentParticipation);
        }
        catch(err) {
            throw err;
        }
    }

    /**
     * Fonction qui permet de renvoyer un tournoi sur base de l'id de celui-ci.
     * @param {number} tournamentId - L'id du tournoi à renvoyer. 
     * @returns {Tournament | undefined} le tournoi ou undefined si celui-ci n'existe pas.
     */
    async getTournament(tournamentId: number): Promise<Tournament | undefined> {
        try {
            const result = await this.tournamentRepository.getOne(tournamentId);
            if(!result) {
                return undefined;
            }
            return result;
        }
        catch(err) {
            throw err;
        }
    }

    /**
     * Fonction qui renvoir la liste de tous les tournois.
     * @returns {TournamentDTO[] | null} la liste des tournois ou null si aucun tournoi n'existe.
     */
    async getAllTournaments(): Promise<TournamentDTO[] | null> {
        try {
            const result = await this.tournamentRepository.getAll();
            let dtoArray: TournamentDTO[] = [];
            if(!result) {
                return null;
            }
            for (const tournament of result) {
                let dto: TournamentDTO = new TournamentDTO();
                dto.id = tournament.id;
                dto.name = tournament.name;
                dto.areInscriptionsclosed = tournament.areInscriptionsClosed;
                dto.startDate = tournament.startDate;
                dto.endDate = tournament.endDate;
                dto.seed = tournament.seed;
                dto.matches = tournament.matches;
                dtoArray.push(dto);
            }
            return dtoArray;
        }
        catch(err) {
            throw err;
        }
    }

    /**
     * Fonction qui renvoie uniquement les tournois d'un tournoi en question.
     * @param {number} tournamentId - L'id du tournoi dont il faut renvoyer les matchs. 
     * @returns {TournamentMatch[] | null} tous les matchs du tournoi ou null si aucun match n'existe encore.
     */
    async getTournamentMatches(tournamentId: number): Promise<TournamentMatch[] | null> {
        try {
            const result =  await this.tournamentRepository.getOneOnlyMatches(tournamentId);
            if(!result) {
                return null;
            }
            return result;
        }
        catch(err) {
            throw err;
        }
    }

    /**
     * Fonction qui renvoie les matchs d'un tournois pour un round spécifique.
     * @param {number} tournamentId - L'id du tournoi dont il faut retourner les matchs.
     * @param {number} round - Le numéro du round pour lequel il faut renvoyer les matchs.
     * @returns {TournamentMatch[] | null} La liste des matchs pour le round du tournois ou null si il n'y en a aucun.
     */
    async getMatchesByRound(tournamentId: number, round: number): Promise<TournamentMatch[] | null> {
        try {
            const result =  await this.tournamentMatchRepository.getAllMatchesForARound(tournamentId, round);
            if(!result) {
                return null;
            }
            return result;
        }
        catch(err) {
            throw err;
        }
    }

    /**
     * Fonction qui permet de renvoyer tous les participations des équipes aux différents tournois.
     * @returns {TournamentParticipation[] | null} La liste de toutes les participations aux tournois ou null si aucune n'existe.
     */
    async getAllPartcipations(): Promise<TournamentParticipation[] | null> {
        try {
            const result = await this.tournamentParticipationRepository.getAll();
            if(!result) {
                return null;
            }
            return result;
        }
        catch(err) {
            throw err;
        }
    }

    /**
     * Fonction qui renvoie tous les participants d'un tournoi.
     * @param {number} tournamentId - L'id du tournoi, dont il faut retourner les participants. 
     * @returns {TournamentParticipantsDTO[] | null} la liste des participants d'un tournoi ou null si aucun participant.
     */
    async getAllOfATournament(tournamentId: number): Promise<TournamentParticipantsDTO[] | null> {
        try {
            const result = await this.tournamentParticipationRepository.getAllOfATournament(tournamentId);
            const dtoArray: TournamentParticipantsDTO[] = [];
            if(!result) {
                return null;
            }
            for (const participation of result) {
                let dto: TournamentParticipantsDTO = new TournamentParticipantsDTO();
                dto.id = participation.team.id;
                dto.teamName = participation.team.name;
                dto.players = [];
                    for (const player of participation.team.players) {
                        if(player) {
                            dto.players.push(player.name);
                        }
                    }
                dtoArray.push(dto);
            }
            return dtoArray;
        }
        catch(err) {
            throw err;
        }
    }

    async getAllOfMyTeam(askerId: number, teamId: number): Promise<TournamentDTO[] | null | UnauthorizedException> {
        try {
            const asker = await this.playerRepository.getOne(askerId);
            if(!asker || !asker.team || asker.team.id !== teamId) {
                return new UnauthorizedException();
            }
            const result = await this.tournamentParticipationRepository.getAllOfATeam(+teamId);
            console.log(result[0].id);
            let dtoArray: TournamentDTO[] = [];
            if(!result) {
                return null;
            }
            for (const participation of result) {
                let dto: TournamentDTO = new TournamentDTO();
                dto.id = participation.tournament.id;
                dto.name = participation.tournament.name;
                dto.areInscriptionsclosed = participation.tournament.areInscriptionsClosed;
                dto.startDate = participation.tournament.startDate;
                dto.endDate = participation.tournament.endDate;
                dto.seed = participation.tournament.seed;
                dtoArray.push(dto);
            }
            return dtoArray;
        }
        catch(err) {
            throw err;
        }
    }

    async getAllMatchesOfTeam(teamId: number): Promise<TournamentMatchDTO[] | null> {
        try {
            const result = await this.tournamentMatchRepository.getAllMatchesOfATeam(teamId);
            const dtoArray: TournamentMatchDTO[] = [];
            if(!result) {
                return null;
            }
            for (const match of result) {
                let dto: TournamentMatchDTO = new TournamentMatchDTO();
                dto.id = match.id;
                dto.round = match.round;
                dto.bestOfType = match.bestOfType;
                dto.isOver = match.isOver;
                if(match.teamA) {
                    dto.teamA = match.teamA.name;
                    dto.teamALogo = match.teamA.logo;
                }
                dto.teamAWins = match.teamAWins;
                if(match.teamB) {
                    dto.teamB = match.teamB.name;
                    dto.teamBLogo = match.teamB.logo;
                }
                dto.teamBWins = match.teamBWins;
                match.winner ? dto.winner = match.winner.name : dto.winner = null;
                dto.tournament = match.tournament.name;
                dtoArray.push(dto);
            }
            return dtoArray;
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
            let nextMatchForWinner: TournamentMatch;
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
                nextMatchForWinner = matches.find(nm => nm.round === match.round + 1 && nm.order === Math.ceil(match.order/2));
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

    filterNextMatch(previousMatch: TournamentMatch, nextMatch: TournamentMatch): boolean {
        if(nextMatch.round === (previousMatch.round +1)  ) {
            return false;
        }
        return true;
    }
}


