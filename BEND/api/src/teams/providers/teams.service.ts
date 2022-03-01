import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { captureRejections } from "events";
import { from, Observable } from "rxjs";
import { PlayerInterface } from "src/players/models/player.interface";
import { Player } from "src/players/models/players.entity";
import { DeleteResult, Repository, UpdateResult} from "typeorm";
import { Team } from "../models/teams.entity";
import { TeamInterface } from "../models/teams.interface";
import { TeamRepository } from "../repository/teams.repository";

@Injectable()
export class TeamsService {
    constructor(
        
        private readonly TeamRepository: TeamRepository,
        

    ){}
    
    async createTeam(team : Team): Promise<Team> {
        try {
            
            const newTeam = await this.TeamRepository.save(team);
            
            return newTeam;

        }
        catch(err) {
            
            throw err;
         }
    }

    async getAllTeams(): Promise<Team[]> {
        try {

            const teams = await this.TeamRepository.find();
            
            return teams;
        }
        catch(err) {
            
            throw err;
        }
    }

    async getAllPlayersWithTeam(): Promise<Team[]> {
        try {

            const playersWithTeam = await this.TeamRepository.getTeamsWithPlayers();

            return playersWithTeam;
        }
        catch(err) {
            
            throw err;
        }
    }
    
    async getTeamByID(idTeam: number): Promise<Team> {
        try {

            const team = await this.TeamRepository.getTeamByID(idTeam);

            return team;
        }
        catch(err) {

            throw err;
        }
    }

    async updateTeam(idTeam: number, team: Team): Promise<UpdateResult> {
        try {

            const teamModified = await this.TeamRepository.updateTeam(idTeam, team);

            return teamModified;
        }
        catch(err) {

            throw err;
        }
    }

    async deleteTeam(idTeam: number): Promise<DeleteResult> {
        try {
            
            const teamDeleted = await this.TeamRepository.deleteTeam(idTeam);

            return teamDeleted;
        }
        catch(err) {

            throw err;
        }
    }

    


    
}