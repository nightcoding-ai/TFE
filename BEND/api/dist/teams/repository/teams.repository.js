"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamRepository = void 0;
const teams_entity_1 = require("../models/teams.entity");
const typeorm_1 = require("typeorm");
const player_entity_1 = require("../../players/models/player/player.entity");
class TeamRepository extends typeorm_1.Repository {
    async addTeam(teamDTO) {
        const teamRepo = (0, typeorm_1.getRepository)(teams_entity_1.Team);
        return await teamRepo.save(teamDTO);
    }
    async getAll() {
        const teamRepo = (0, typeorm_1.getRepository)(teams_entity_1.Team);
        return await teamRepo.find({
            withDeleted: true,
            select: ["id", "name", "abbreviation"]
        });
    }
    async getAllWithLogos() {
        const teamRepo = (0, typeorm_1.getRepository)(teams_entity_1.Team);
        return await teamRepo.find({
            select: ["id", "name", "logo"],
            order: {
                name: "ASC"
            }
        });
    }
    async getNumberOfTeams() {
        const teamRepo = (0, typeorm_1.getRepository)(teams_entity_1.Team);
        return await teamRepo.count();
    }
    async getAllFullTeams() {
        const teamRepo = (0, typeorm_1.getRepository)(teams_entity_1.Team);
        const teams = await teamRepo.find({ select: ["id", "name"] });
        const fullTeams = [];
        for (const team of teams) {
            if (team.players.length === 5) {
                fullTeams.push(team);
            }
        }
        return fullTeams;
    }
    async getAllNotFullTeams() {
        const teamRepo = (0, typeorm_1.getRepository)(teams_entity_1.Team);
        const teams = await teamRepo.find({ select: ["id", "name"] });
        const notFullTeams = [];
        for (const team of teams) {
            if (team.players.length < 5) {
                notFullTeams.push(team);
            }
        }
        return notFullTeams;
    }
    async getTeamsWithPrecisedNumberOfPlayers(nbr) {
        const teamRepo = (0, typeorm_1.getRepository)(teams_entity_1.Team);
        const teams = await teamRepo.find({
            select: ["id", "name"]
        });
        const notFullTeams = [];
        for (const team of teams) {
            if (team.players.length === nbr) {
                notFullTeams.push(team);
            }
        }
        return notFullTeams;
    }
    async getTeamsWithPrecisedFreePlaces(nbr) {
        const teamRepo = (0, typeorm_1.getRepository)(teams_entity_1.Team);
        const teams = await teamRepo.find({
            select: ["id", "name"]
        });
        const teamsWithFreePlaces = [];
        for (const team of teams) {
            if (team.players.length === (5 - nbr)) {
                teamsWithFreePlaces.push(team);
            }
        }
        return teamsWithFreePlaces;
    }
    async getTeam(idTeam) {
        const teamRepo = (0, typeorm_1.getRepository)(teams_entity_1.Team);
        return await teamRepo.findOne(idTeam, {
            relations: ["players"]
        });
    }
    async updateTeam(idTeam, teamDTO) {
        const teamRepo = (0, typeorm_1.getRepository)(teams_entity_1.Team);
        return await teamRepo.update(idTeam, teamDTO);
    }
    async deleteTeam(idTeam) {
        const teamRepo = (0, typeorm_1.getRepository)(teams_entity_1.Team);
        const playerRepo = (0, typeorm_1.getRepository)(player_entity_1.Player);
        const teamToDeleted = await teamRepo.findOne(idTeam);
        for (const player of teamToDeleted.players) {
            player.team = null;
            await playerRepo.save(player);
        }
        return await teamRepo.softDelete(idTeam);
    }
}
exports.TeamRepository = TeamRepository;
//# sourceMappingURL=teams.repository.js.map