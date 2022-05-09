"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TournamentService = void 0;
const common_1 = require("@nestjs/common");
const userType_enum_1 = require("../../players/enum/userType.enum");
const player_repository_1 = require("../../players/repository/player/player.repository");
const teams_repository_1 = require("../../teams/repository/teams.repository");
const tournamentDTO_1 = require("../DTO/tournamentDTO");
const tournamentMatchDTO_1 = require("../DTO/tournamentMatchDTO");
const tournamentParticipantsDTO_1 = require("../DTO/tournamentParticipantsDTO");
const bestOfType_enum_1 = require("../enum/bestOfType.enum");
const tournamentMatch_entity_1 = require("../models/tournamentMatch.entity");
const tournament_repository_1 = require("../repositories/tournament.repository");
const tournamentMatch_repositoy_1 = require("../repositories/tournamentMatch.repositoy");
const tournamentParticipation_repository_1 = require("../repositories/tournamentParticipation.repository");
let TournamentService = class TournamentService {
    constructor(tournamentRepository, playerRepository, teamRepository, tournamentParticipationRepository, tournamentMatchRepository) {
        this.tournamentRepository = tournamentRepository;
        this.playerRepository = playerRepository;
        this.teamRepository = teamRepository;
        this.tournamentParticipationRepository = tournamentParticipationRepository;
        this.tournamentMatchRepository = tournamentMatchRepository;
    }
    async createOne(adminId, createTournamentDTO) {
        try {
            const admin = await this.playerRepository.getOne(adminId);
            if (admin.userType !== userType_enum_1.UserType.ADMIN) {
                return new common_1.UnauthorizedException();
            }
            return await this.tournamentRepository.createOne(createTournamentDTO);
        }
        catch (err) {
            throw err;
        }
    }
    async startTournament(adminId, tournamentId) {
        try {
            const admin = await this.playerRepository.getOne(adminId);
            const tournament = await this.tournamentRepository.getOne(Number(tournamentId));
            const allParticipations = await this.tournamentParticipationRepository.getAllOfATournament(tournament.id);
            const allTeamsParticipating = [];
            if (admin.userType !== userType_enum_1.UserType.ADMIN) {
                return new common_1.UnauthorizedException();
            }
            else if (!tournament || allParticipations.length !== tournament.seed || tournament.startDate > new Date() || tournament.startDate > tournament.endDate || tournament.areInscriptionsClosed) {
                throw new common_1.UnauthorizedException("Tournament can't be started", "Le tournoi n'a pas pu être lancé pour ces possibles raisons :  Le tournoi n'existe pas, le tournoi a plus de participants que nécessaire, les dates ne conviennent pas ou les inscription sont fermées.");
            }
            tournament.areInscriptionsClosed = true;
            await this.tournamentRepository.saveOne(tournament);
            for (const participation of allParticipations) {
                allTeamsParticipating.push(participation.team);
            }
            let teamsToDistribute = [...allTeamsParticipating];
            for (let i = 0; i < (tournament.seed / 2); i++) {
                let match = new tournamentMatch_entity_1.TournamentMatch();
                let bothFigthers = [];
                for (let j = 0; j < 2; j++) {
                    let fighter = teamsToDistribute[Math.floor(Math.random() * teamsToDistribute.length)];
                    bothFigthers.push(fighter);
                    const index = teamsToDistribute.indexOf(fighter);
                    if (index > -1) {
                        teamsToDistribute.splice(index, 1);
                    }
                }
                match.round = 1;
                match.bestOfType = bestOfType_enum_1.BestOfTypeEnum.BO3;
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
            for (let j = 0; j < Math.log2(tournament.seed) - 1; j++) {
                let MatchesFromLastRound = await this.tournamentMatchRepository.getAllMatchesForARound(tournament.id, j + 1);
                for (let k = 0; k < MatchesFromLastRound.length / 2; k++) {
                    let newMatch = new tournamentMatch_entity_1.TournamentMatch();
                    newMatch.round = MatchesFromLastRound[0].round + 1;
                    if (newMatch.round === Math.log2(tournament.seed)) {
                        newMatch.bestOfType = bestOfType_enum_1.BestOfTypeEnum.BO5;
                    }
                    newMatch.order = k + 1;
                    newMatch.tournament = tournament;
                    await this.tournamentMatchRepository.createOne(newMatch);
                }
            }
            return tournament;
        }
        catch (err) {
            throw err;
        }
    }
    async addParticipantAsAdmin(adminId, tournamentParticipation) {
        try {
            const admin = await this.playerRepository.getOne(adminId);
            const teamToAdd = await this.teamRepository.getTeam(tournamentParticipation.team);
            const tournament = await this.tournamentRepository.getOne(tournamentParticipation.tournament);
            const tournamentAllParticipants = await this.tournamentParticipationRepository.getAllOfATournament(Number(tournament.id));
            if (admin.userType !== userType_enum_1.UserType.ADMIN || teamToAdd.players.length < 5) {
                return new common_1.UnauthorizedException();
            }
            else if (tournament.participants && tournament.participants.length >= tournament.seed) {
                return new common_1.UnauthorizedException();
            }
            else if (tournamentAllParticipants.find(tournamentP => tournamentP.team.id === tournamentParticipation.team)) {
                return new common_1.UnauthorizedException();
            }
            return await this.tournamentParticipationRepository.createOne(tournamentParticipation);
        }
        catch (err) {
            throw err;
        }
    }
    async addParticipantAsCaptain(captainId, tournamentParticipation) {
        try {
            const captain = await this.playerRepository.getOne(captainId);
            const teamToAdd = await this.teamRepository.getTeam(tournamentParticipation.team);
            const tournament = await this.tournamentRepository.getOne(tournamentParticipation.tournament);
            const teamAllParticipations = await this.tournamentParticipationRepository.getAllOfATeam(Number(teamToAdd.id));
            if (!captain.team || !captain.profile.isCaptain || captain.team.players.length > 5 || captain.team.id !== tournamentParticipation.team) {
                return new common_1.UnauthorizedException('Not authorized');
            }
            else if (tournament.participants && tournament.participants.length >= tournament.seed || tournament.areInscriptionsClosed) {
                return new common_1.UnauthorizedException('Not authorized');
            }
            else if (teamAllParticipations.find(tournamentP => tournamentP.team.id === tournamentParticipation.team)) {
                return new common_1.UnauthorizedException('Not authorized');
            }
            return await this.tournamentParticipationRepository.createOne(tournamentParticipation);
        }
        catch (err) {
            throw err;
        }
    }
    async getTournament(tournamentId) {
        try {
            const result = await this.tournamentRepository.getOne(tournamentId);
            if (!result) {
                return undefined;
            }
            return result;
        }
        catch (err) {
            throw err;
        }
    }
    async getAllTournaments() {
        try {
            const result = await this.tournamentRepository.getAll();
            let dtoArray = [];
            if (!result) {
                return null;
            }
            for (const tournament of result) {
                let dto = new tournamentDTO_1.TournamentDTO();
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
        catch (err) {
            throw err;
        }
    }
    async getTournamentMatches(tournamentId) {
        try {
            const result = await this.tournamentRepository.getOneOnlyMatches(tournamentId);
            if (!result) {
                return null;
            }
            return result;
        }
        catch (err) {
            throw err;
        }
    }
    async getMatchesByRound(tournamentId, round) {
        try {
            const result = await this.tournamentMatchRepository.getAllMatchesForARound(tournamentId, round);
            if (!result) {
                return null;
            }
            return result;
        }
        catch (err) {
            throw err;
        }
    }
    async getAllPartcipations() {
        try {
            const result = await this.tournamentParticipationRepository.getAll();
            if (!result) {
                return null;
            }
            return result;
        }
        catch (err) {
            throw err;
        }
    }
    async getAllOfATournament(tournamentId) {
        try {
            const result = await this.tournamentParticipationRepository.getAllOfATournament(tournamentId);
            const dtoArray = [];
            if (!result) {
                return null;
            }
            for (const participation of result) {
                let dto = new tournamentParticipantsDTO_1.TournamentParticipantsDTO();
                dto.id = participation.team.id;
                dto.teamName = participation.team.name;
                dto.players = [];
                for (const player of participation.team.players) {
                    if (player) {
                        dto.players.push(player.name);
                    }
                }
                dtoArray.push(dto);
            }
            return dtoArray;
        }
        catch (err) {
            throw err;
        }
    }
    async getAllOfMyTeam(askerId, teamId) {
        try {
            const asker = await this.playerRepository.getOne(askerId);
            if (!asker || !asker.team || asker.team.id !== teamId) {
                return new common_1.UnauthorizedException();
            }
            const result = await this.tournamentParticipationRepository.getAllOfATeam(+teamId);
            let dtoArray = [];
            if (!result) {
                return null;
            }
            for (const participation of result) {
                let dto = new tournamentDTO_1.TournamentDTO();
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
        catch (err) {
            throw err;
        }
    }
    async getAllMatchesOfTeam(teamId) {
        try {
            const result = await this.tournamentMatchRepository.getAllMatchesOfATeam(teamId);
            const dtoArray = [];
            if (!result) {
                return null;
            }
            for (const match of result) {
                let dto = new tournamentMatchDTO_1.TournamentMatchDTO();
                dto.id = match.id;
                dto.round = match.round;
                dto.bestOfType = match.bestOfType;
                dto.isOver = match.isOver;
                if (match.teamA) {
                    dto.teamA = match.teamA.name;
                    dto.teamALogo = match.teamA.logo;
                }
                dto.teamAWins = match.teamAWins;
                if (match.teamB) {
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
        catch (err) {
            throw err;
        }
    }
    async updateMatchScore(adminId, tournamentId, matchId, newMatchScore) {
        try {
            const admin = await this.playerRepository.getOne(adminId);
            const match = await this.tournamentMatchRepository.getOne(matchId);
            const matches = await this.tournamentRepository.getOneOnlyMatches(tournamentId);
            let nextMatchForWinner;
            if (admin.userType !== userType_enum_1.UserType.ADMIN) {
                throw new common_1.UnauthorizedException();
            }
            if (match.isOver || match.winner || !match || !matches.find(m => m.id === match.id) || (newMatchScore.teamAWins === match.bestOfType && newMatchScore.teamBWins === match.bestOfType) || newMatchScore.teamAWins > match.bestOfType || newMatchScore.teamBWins > match.bestOfType) {
                throw new common_1.UnauthorizedException("Match score can't be updated", "Le score ne peut être modifié car soit le match n'existe pas, soit le match est terminé.");
            }
            match.teamAWins = newMatchScore.teamAWins;
            match.teamBWins = newMatchScore.teamBWins;
            await this.tournamentMatchRepository.saveOne(match);
            if (newMatchScore.teamAWins === match.bestOfType || newMatchScore.teamBWins === match.bestOfType) {
                match.isOver = true;
                match.teamAWins === match.bestOfType ? match.winner = match.teamA : match.winner = match.teamB;
                nextMatchForWinner = matches.find(nm => nm.round === match.round + 1 && nm.order === Math.ceil(match.order / 2));
                await this.tournamentMatchRepository.saveOne(match);
                if (nextMatchForWinner.teamA === null && nextMatchForWinner.teamB === null) {
                    nextMatchForWinner.teamA = match.winner;
                    return await this.tournamentMatchRepository.saveOne(nextMatchForWinner);
                }
                if (nextMatchForWinner.teamA !== null && nextMatchForWinner.teamB === null && nextMatchForWinner.teamA !== match.winner) {
                    nextMatchForWinner.teamB = match.winner;
                    return await this.tournamentMatchRepository.saveOne(nextMatchForWinner);
                }
            }
            return match;
        }
        catch (err) {
            throw err;
        }
    }
    async deleteAParticpantAsAdmin(adminId, tournamentParticipationId) {
        try {
            const admin = await this.playerRepository.getOne(adminId);
            if (admin.userType !== userType_enum_1.UserType.ADMIN) {
                throw new common_1.UnauthorizedException();
            }
            return await this.tournamentParticipationRepository.deleteOne(tournamentParticipationId);
        }
        catch (err) {
            throw err;
        }
    }
    async leaveTournament(captainId, tournamentParticipationId) {
        try {
            const captain = await this.playerRepository.getOne(captainId);
            console.log(typeof (tournamentParticipationId));
            const tournamentParticipationToDelete = await this.tournamentParticipationRepository.getOne(tournamentParticipationId);
            if (!captain.team || !captain.profile.isCaptain || captain.team.id !== tournamentParticipationToDelete.team.id || !tournamentParticipationToDelete) {
                throw new common_1.UnauthorizedException('Not authorized');
            }
            return await this.tournamentParticipationRepository.deleteOne(tournamentParticipationToDelete.id);
        }
        catch (err) {
            throw err;
        }
    }
    filterNextMatch(previousMatch, nextMatch) {
        if (nextMatch.round === (previousMatch.round + 1)) {
            return false;
        }
        return true;
    }
};
TournamentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tournament_repository_1.TournamentRepository,
        player_repository_1.PlayerRepository,
        teams_repository_1.TeamRepository,
        tournamentParticipation_repository_1.TournamentParticipationRepository,
        tournamentMatch_repositoy_1.TournamentMatchRepository])
], TournamentService);
exports.TournamentService = TournamentService;
//# sourceMappingURL=tournament.service.js.map