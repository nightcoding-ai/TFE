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
exports.TeamsService = void 0;
const common_1 = require("@nestjs/common");
const playerDTO_1 = require("../../players/DTO/player/playerDTO");
const userType_enum_1 = require("../../players/enum/userType.enum");
const player_repository_1 = require("../../players/repository/player/player.repository");
const tournament_repository_1 = require("../../tournaments/repositories/tournament.repository");
const tournamentMatch_repositoy_1 = require("../../tournaments/repositories/tournamentMatch.repositoy");
const tournamentParticipation_repository_1 = require("../../tournaments/repositories/tournamentParticipation.repository");
const fullTeamDTO_1 = require("../DTO/fullTeamDTO");
const notFullTeamDTO_1 = require("../DTO/notFullTeamDTO");
const teamDTO_1 = require("../DTO/teamDTO");
const teamWithLogoDTO_1 = require("../DTO/teamWithLogoDTO");
const teams_repository_1 = require("../repository/teams.repository");
let TeamsService = class TeamsService {
    constructor(TeamRepository, PlayerRepository, TournamentRepo, TournamentParticipationRepository, TournamentMatchRepository) {
        this.TeamRepository = TeamRepository;
        this.PlayerRepository = PlayerRepository;
        this.TournamentRepo = TournamentRepo;
        this.TournamentParticipationRepository = TournamentParticipationRepository;
        this.TournamentMatchRepository = TournamentMatchRepository;
    }
    async create(idPlayer, teamDTO) {
        try {
            const player = await this.PlayerRepository.getOne(idPlayer);
            if (player.team || player.team !== null || player.profile.isCaptain === true) {
                throw new common_1.UnauthorizedException();
            }
            else {
                const newTeam = await this.TeamRepository.addTeam(teamDTO);
                player.team = newTeam;
                player.profile.isCaptain = true;
                await this.PlayerRepository.savePlayer(player);
                return newTeam.id;
            }
        }
        catch (err) {
            throw err;
        }
    }
    async getAll(adminId) {
        try {
            const admin = await this.PlayerRepository.getOne(adminId);
            if (admin.userType !== userType_enum_1.UserType.ADMIN) {
                throw new common_1.UnauthorizedException('Access denied, admin ressources');
            }
            let dtoArray = [];
            const result = await this.TeamRepository.getAll();
            if (!result) {
                return null;
            }
            for (const item of result) {
                let dto = new teamDTO_1.TeamDTO();
                let t = [];
                dto.id = item.id;
                dto.name = item.name;
                dto.abbreviation = item.abbreviation;
                for (const player of item.players) {
                    let p = new playerDTO_1.PlayerDTO();
                    p.id = player.id;
                    p.name = player.name;
                    p.discord = player.profile.discord;
                    p.role = player.profile.role;
                    p.rank = player.profile.rank;
                    t.push(p);
                }
                dto.players = t;
                dtoArray.push(dto);
            }
            return dtoArray;
        }
        catch (err) {
            throw err;
        }
    }
    async getAllWithLogos() {
        try {
            const result = await this.TeamRepository.getAllWithLogos();
            if (!result) {
                return null;
            }
            let dtoArray = [];
            for (const item of result) {
                let team = new teamWithLogoDTO_1.TeamWithLogoDTO();
                team.id = item.id;
                team.name = item.name;
                team.logo = item.logo;
                dtoArray.push(team);
            }
            return dtoArray;
        }
        catch (err) {
            throw err;
        }
    }
    async getNumberOfTeams() {
        try {
            return await this.TeamRepository.getNumberOfTeams();
        }
        catch (err) {
            throw err;
        }
    }
    async getNumberOfTournamentsWon(teamId) {
        try {
            const result = await this.TournamentRepo.getTournamentsWonByTeam(teamId);
            return result.length;
        }
        catch (err) {
            throw err;
        }
    }
    async getFullTeams() {
        try {
            const result = await this.TeamRepository.getAllFullTeams();
            if (!result) {
                return null;
            }
            let dtoArray = [];
            for (const item of result) {
                let team = new fullTeamDTO_1.FullTeamDTO();
                team.id = item.id;
                team.name = item.name;
                team.abbreviation = item.abbreviation;
                dtoArray.push(team);
            }
            return dtoArray;
        }
        catch (err) {
            throw err;
        }
    }
    async getNotFullTeams() {
        try {
            const roles = [
                "Toplaner",
                "Jungler",
                "Midlaner",
                "ADC",
                "Support"
            ];
            const takenRoles = [];
            const freeRoles = [];
            let dtoArray = [];
            const result = await this.TeamRepository.getAllNotFullTeams();
            if (!result) {
                return null;
            }
            for (const team of result) {
                let dto = new notFullTeamDTO_1.NotFullTeamDTO();
                dto.id = team.id;
                dto.name = team.name;
                dto.abbreviation = team.abbreviation;
                for (const player of team.players) {
                    if (roles.find(role => role === player.profile.role)) {
                        takenRoles.push(player.profile.role);
                    }
                }
                for (const role of roles) {
                    if (takenRoles.find(r => r !== role)) {
                        freeRoles.push(role);
                    }
                }
                dto.freeRoles = freeRoles;
                dtoArray.push(dto);
            }
            return dtoArray;
        }
        catch (err) {
            throw err;
        }
    }
    async getTeamsWithPrecisedNumberOfPlayers(nbr) {
        try {
            const result = await this.TeamRepository.getTeamsWithPrecisedNumberOfPlayers(parseInt(nbr));
            if (!result) {
                return null;
            }
            return result;
        }
        catch (err) {
            throw err;
        }
    }
    async getTeamsWithPrecisedFreePlaces(nbr) {
        try {
            const result = await this.TeamRepository.getTeamsWithPrecisedFreePlaces(parseInt(nbr));
            if (!result) {
                return null;
            }
            return result;
        }
        catch (err) {
            throw err;
        }
    }
    async getTeam(idTeam) {
        try {
            const result = await this.TeamRepository.getTeam(idTeam);
            if (!result) {
                return undefined;
            }
            let dto = new teamDTO_1.TeamDTO();
            dto.id = result.id;
            dto.name = result.name;
            dto.abbreviation = result.abbreviation;
            dto.logo = result.logo;
            if (result.players) {
                dto.players = [];
                for (const player of result.players) {
                    if (player) {
                        let dtoPlayer = new playerDTO_1.PlayerDTO();
                        dtoPlayer.id = player.id;
                        dtoPlayer.name = player.name;
                        dtoPlayer.discord = player.profile.discord;
                        dtoPlayer.role = player.profile.role;
                        dtoPlayer.rank = player.profile.rank;
                        if (player.profile.profilPicture) {
                            dtoPlayer.profilPicture = player.profile.profilPicture;
                        }
                        dtoPlayer.ign = player.profile.inGameName;
                        dtoPlayer.isCaptain = player.profile.isCaptain;
                        dto.players.push(dtoPlayer);
                    }
                }
            }
            return dto;
        }
        catch (err) {
            throw err;
        }
    }
    async updateTeam(idPlayer, teamDTO) {
        try {
            const player = await this.PlayerRepository.getOne(idPlayer);
            if (!player.team || player.team === null || player.profile.isCaptain === false) {
                throw new common_1.UnauthorizedException();
            }
            else {
                if (teamDTO.logo === '' || teamDTO.logo === null) {
                    teamDTO.logo = player.team.logo;
                    const updatedTeam = await this.TeamRepository.updateTeam(player.team.id, teamDTO);
                    return updatedTeam;
                }
                const updatedTeam = await this.TeamRepository.updateTeam(player.team.id, teamDTO);
                return updatedTeam;
            }
        }
        catch (err) {
            throw err;
        }
    }
    async deleteTeam(idPlayer) {
        try {
            const player = await this.PlayerRepository.getOne(idPlayer);
            if (player.profile.isCaptain !== true || player.team === null || player.team === undefined) {
                throw new common_1.UnauthorizedException();
            }
            else {
                const teamID = player.team.id;
                player.team = null;
                player.profile.isCaptain = false;
                await this.PlayerRepository.savePlayer(player);
                const deleted = await this.TeamRepository.deleteTeam(teamID);
                return deleted;
            }
        }
        catch (err) {
            throw err;
        }
    }
    async banPlayer(idCaptain, idPlayer) {
        try {
            const captain = await this.PlayerRepository.getOne(idCaptain);
            const player = await this.PlayerRepository.getOne(idPlayer);
            const allMatchesOfTeam = await this.TournamentMatchRepository.getAllMatchesOfATeam(player.team.id);
            const allTournamentsOfTeam = await this.TournamentParticipationRepository.getAllOfATeam(player.team.id);
            if (captain.profile.isCaptain === false || player.profile.isCaptain === true || player.team.id !== captain.team.id) {
                throw new common_1.UnauthorizedException();
            }
            if (captain.team.players.length === 5 && allMatchesOfTeam) {
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
                    await this.TournamentMatchRepository.saveOne(match);
                    for (const participation of allTournamentsOfTeam) {
                        let tournament = await this.TournamentRepo.getOneWithMatches(participation.tournament.id);
                        let nextMatchForWinner = tournament.matches.find(nm => nm.round === match.round + 1 && nm.order === Math.ceil(match.order / 2));
                        if (nextMatchForWinner.teamA === null && nextMatchForWinner.teamB === null) {
                            nextMatchForWinner.teamA = match.winner;
                            await this.TournamentMatchRepository.saveOne(nextMatchForWinner);
                        }
                        if (nextMatchForWinner.teamA !== null && nextMatchForWinner.teamB === null && nextMatchForWinner.teamA !== match.winner) {
                            nextMatchForWinner.teamB = match.winner;
                            await this.TournamentMatchRepository.saveOne(nextMatchForWinner);
                        }
                    }
                }
            }
            player.team = null;
            await this.PlayerRepository.savePlayer(player);
        }
        catch (err) {
            throw err;
        }
    }
    async setAsCaptain(idOldCaptain, idNewCaptain) {
        try {
            const oldCaptain = await this.PlayerRepository.getOne(idOldCaptain);
            const newCaptain = await this.PlayerRepository.getOne(idNewCaptain);
            if (!oldCaptain || !newCaptain || oldCaptain.profile.isCaptain === false || newCaptain.profile.isCaptain === true || oldCaptain.team.id !== newCaptain.team.id || oldCaptain.id === newCaptain.id) {
                throw new common_1.UnauthorizedException();
            }
            oldCaptain.profile.isCaptain = false;
            newCaptain.profile.isCaptain = true;
            await this.PlayerRepository.savePlayer(oldCaptain);
            return await this.PlayerRepository.savePlayer(newCaptain);
        }
        catch (err) {
            throw err;
        }
    }
};
TeamsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [teams_repository_1.TeamRepository,
        player_repository_1.PlayerRepository,
        tournament_repository_1.TournamentRepository,
        tournamentParticipation_repository_1.TournamentParticipationRepository,
        tournamentMatch_repositoy_1.TournamentMatchRepository])
], TeamsService);
exports.TeamsService = TeamsService;
//# sourceMappingURL=teams.service.js.map