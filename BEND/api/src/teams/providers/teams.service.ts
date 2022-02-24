import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { captureRejections } from "events";
import { from, Observable } from "rxjs";
import { PlayerInterface } from "src/players/models/player.interface";
import { Player } from "src/players/models/players.entity";
import { Connection, ConnectionManager, DeleteQueryBuilder, DeleteResult, Repository, UpdateEvent, UpdateResult } from "typeorm";
import { Team } from "../models/teams.entity";
import { TeamInterface } from "../models/teams.interface";
import { getTeamsWithPlayers } from "../repository/teams.repository";

@Injectable()
export class TeamsService {
    constructor(
        @InjectRepository(Team)
        private readonly TeamRepository : Repository<Team>,
        @InjectRepository(Player)
        private readonly PlayerRepository : Repository<Player>,
    ){}
    
    async createTeam(team : TeamInterface){
        try {
            
            const newTeam = await this.TeamRepository.save(team);
            
            return newTeam;

        }
        catch(err) {
            
            throw err;
         }
    }

    async getAllTeamsNames(): Promise<Team[]> {
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

            const playersWithTeam = await getTeamsWithPlayers();

            return playersWithTeam;
        }
        catch(err) {
            
            throw err;
        }
    }

    


    
}