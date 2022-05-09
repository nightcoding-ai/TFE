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
exports.PlayersService = void 0;
const common_1 = require("@nestjs/common");
const tournament_repository_1 = require("../../../tournaments/repositories/tournament.repository");
const tournamentMatch_repositoy_1 = require("../../../tournaments/repositories/tournamentMatch.repositoy");
const tournamentParticipation_repository_1 = require("../../../tournaments/repositories/tournamentParticipation.repository");
const playerDTO_1 = require("../../DTO/player/playerDTO");
const playerProfileDTO_1 = require("../../DTO/player/playerProfileDTO");
const player_repository_1 = require("../../repository/player/player.repository");
const profile_repository_1 = require("../../repository/profil/profile.repository");
const argon2 = Promise.resolve().then(() => require('argon2'));
let PlayersService = class PlayersService {
    constructor(PlayerRepo, ProfileRepo, TournamentMatchRepo, TournamentParticipationRepo, TournamentRepo) {
        this.PlayerRepo = PlayerRepo;
        this.ProfileRepo = ProfileRepo;
        this.TournamentMatchRepo = TournamentMatchRepo;
        this.TournamentParticipationRepo = TournamentParticipationRepo;
        this.TournamentRepo = TournamentRepo;
    }
    async createAPlayer(newPlayer) {
        try {
            const hash = await (await argon2).hash(newPlayer.profile.password);
            newPlayer.profile.password = hash;
            return await this.PlayerRepo.addPlayer(newPlayer);
        }
        catch (err) {
            throw err;
        }
    }
    async delete(adminId, idPlayer) {
        try {
            return this.PlayerRepo.isAdmin(adminId) ? this.PlayerRepo.deleteOne(idPlayer) : new common_1.UnauthorizedException();
        }
        catch (err) {
            throw err;
        }
    }
    async getOne(idPlayer) {
        try {
            const result = await this.PlayerRepo.getOne(idPlayer);
            if (!result) {
                return undefined;
            }
            let player = new playerDTO_1.PlayerDTO();
            player.id = result.id;
            player.userType = result.userType;
            player.name = result.name;
            player.discord = result.profile.discord;
            player.profilPicture = result.profile.profilPicture;
            player.role = result.profile.role;
            player.rank = result.profile.rank;
            player.ign = result.profile.inGameName;
            player.isCaptain = result.profile.isCaptain;
            if (result.team) {
                player.teamId = result.team.id;
                player.teamName = result.team.name;
            }
            return player;
        }
        catch (err) {
            throw err;
        }
    }
    async myProfile(idPlayer) {
        try {
            const result = await this.PlayerRepo.getOne(idPlayer);
            if (!result) {
                return undefined;
            }
            const dto = new playerProfileDTO_1.PlayerProfileDTO();
            dto.id = result.id;
            dto.idProfile = result.profile.id;
            dto.name = result.name;
            dto.profilPicture = result.profile.profilPicture;
            dto.mail = result.profile.email;
            dto.discord = result.profile.discord;
            dto.ign = result.profile.inGameName;
            dto.role = result.profile.role;
            dto.rank = result.profile.rank;
            return dto;
        }
        catch (err) {
            throw err;
        }
    }
    async getOneByName(playerName) {
        try {
            return await this.PlayerRepo.getOneByName(playerName);
        }
        catch (err) {
            throw err;
        }
    }
    async getAllPlayers() {
        try {
            const dtoArray = [];
            const result = await this.PlayerRepo.getAll();
            if (result) {
                for (const item of result) {
                    const dto = new playerDTO_1.PlayerDTO();
                    dto.id = item.id;
                    dto.name = item.name;
                    dto.discord = item.profile.discord;
                    dto.ign = item.profile.inGameName;
                    dto.role = item.profile.role;
                    dto.rank = item.profile.rank;
                    if (item.team) {
                        dto.teamName = item.team.name;
                    }
                    dtoArray.push(dto);
                }
                return dtoArray;
            }
            return null;
        }
        catch (err) {
            throw err;
        }
    }
    async getAllFree() {
        const dtoArray = [];
        const result = await this.PlayerRepo.getAllFree();
        if (result) {
            for (const item of result) {
                const dto = new playerDTO_1.PlayerDTO();
                dto.id = item.id;
                dto.name = item.name;
                dto.discord = item.profile.discord;
                dto.role = item.profile.role;
                dto.rank = item.profile.rank;
                dtoArray.push(dto);
            }
            return dtoArray;
        }
        return null;
    }
    async getAllByRoleAndFree(roleOfPlayer) {
        try {
            const result = await this.PlayerRepo.getAllByRoleAndFree(roleOfPlayer);
            if (!result) {
                return undefined;
            }
            const dtoArray = [];
            for (const player of result) {
                let dto = new playerDTO_1.PlayerDTO();
                dto.id = player.id;
                dto.name = player.name;
                dto.discord = player.profile.discord;
                dto.ign = player.profile.inGameName;
                if (player.profile.profilPicture) {
                    dto.profilPicture = player.profile.profilPicture;
                }
                dto.role = player.profile.role;
                dto.rank = player.profile.rank;
                dtoArray.push(dto);
            }
            return dtoArray;
        }
        catch (err) {
            throw err;
        }
    }
    async getNumberOfPlayer() {
        try {
            return await this.PlayerRepo.getNumberOfPlayers();
        }
        catch (err) {
            throw err;
        }
    }
    async updatePlayerProfile(idAsker, idPlayer, updatePlayerProfileDTO) {
        try {
            const asker = await this.PlayerRepo.getOne(idAsker);
            if (asker.id !== +idPlayer) {
                return new common_1.UnauthorizedException();
            }
            await this.ProfileRepo.updateProfile(asker.profile.id, updatePlayerProfileDTO);
        }
        catch (err) {
            throw err;
        }
    }
    async updatePlayer(idAsker, idPlayer, updatePlayerDTO) {
        try {
            const asker = await this.PlayerRepo.getOne(idAsker);
            if (asker.id !== +idPlayer) {
                return new common_1.UnauthorizedException();
            }
            await this.PlayerRepo.updatePlayer(asker.id, updatePlayerDTO);
        }
        catch (err) {
            throw err;
        }
    }
    async leaveTeam(idPlayer) {
        try {
            const player = await this.PlayerRepo.getOne(idPlayer);
            const allMatchesOfTeam = await this.TournamentMatchRepo.getAllMatchesOfATeam(player.team.id);
            const allTournamentsOfTeam = await this.TournamentParticipationRepo.getAllOfATeam(player.team.id);
            if (!player || !player.team) {
                throw new common_1.UnauthorizedException();
            }
            if (player.profile.isCaptain) {
                player.team = null;
                player.profile.isCaptain = false;
                await this.PlayerRepo.savePlayer(player);
            }
            if (player.team.players.length === 5 && allMatchesOfTeam) {
                for (const match of allMatchesOfTeam) {
                    if (match.teamA.id === player.team.id) {
                        match.teamAWins = 0;
                        match.teamBWins = match.bestOfType;
                        match.winner = match.teamB;
                        match.isOver = true;
                    }
                    if (match.teamB.id === player.team.id) {
                        match.teamBWins = 0;
                        match.teamAWins = match.bestOfType;
                        match.winner = match.teamA;
                        match.isOver = true;
                    }
                    await this.TournamentMatchRepo.saveOne(match);
                    for (const participation of allTournamentsOfTeam) {
                        let tournament = await this.TournamentRepo.getOneWithMatches(participation.tournament.id);
                        let nextMatchForWinner = tournament.matches.find(nm => nm.round === match.round + 1 && nm.order === Math.ceil(match.order / 2));
                        if (nextMatchForWinner.teamA === null && nextMatchForWinner.teamB === null) {
                            nextMatchForWinner.teamA = match.winner;
                            await this.TournamentMatchRepo.saveOne(nextMatchForWinner);
                        }
                        if (nextMatchForWinner.teamA !== null && nextMatchForWinner.teamB === null && nextMatchForWinner.teamA !== match.winner) {
                            nextMatchForWinner.teamB = match.winner;
                            await this.TournamentMatchRepo.saveOne(nextMatchForWinner);
                        }
                    }
                }
            }
            player.team = null;
            return await this.PlayerRepo.savePlayer(player);
        }
        catch (err) {
            throw err;
        }
    }
    async deleteProfilePicture(playerId) {
        try {
            const player = await this.PlayerRepo.getOne(playerId);
            if (!player.profile.profilPicture) {
                return null;
            }
        }
        catch (err) {
            throw err;
        }
    }
};
PlayersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [player_repository_1.PlayerRepository,
        profile_repository_1.ProfileRepository,
        tournamentMatch_repositoy_1.TournamentMatchRepository,
        tournamentParticipation_repository_1.TournamentParticipationRepository,
        tournament_repository_1.TournamentRepository])
], PlayersService);
exports.PlayersService = PlayersService;
//# sourceMappingURL=player.service.js.map