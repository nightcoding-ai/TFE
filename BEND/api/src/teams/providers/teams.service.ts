import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { captureRejections } from "events";
import { from, Observable } from "rxjs";
import { DeleteResult, Repository, UpdateResult} from "typeorm";
import { TeamDTO } from "../DTO/teamDTO";
import { Team } from "../models/teams.entity";
import { TeamRepository } from "../repository/teams.repository";

@Injectable()
export class TeamsService {
    constructor(
        
        private readonly TeamRepository: TeamRepository,
        

    ){}
    
    async create(teamDTO : TeamDTO): Promise<void> {
        try {
            
            await this.TeamRepository.addTeam(teamDTO);
            
            

        }
        catch(err) {
            
            throw err;
         }
    }

    async getAll(): Promise<TeamDTO[]> {
        try{

            const teams = await this.TeamRepository.getAll();

            return teams;
        }
        catch(err) {

            throw err;
        }
    }

    async getTeam(idTeam: number): Promise<TeamDTO> {
        try{

            const team = await this.TeamRepository.getTeam(idTeam);
            

            return team;
        }
        catch(err) {
            
            throw err;
        }
    }

    async updateTeam(idTeam: number, teamDTO: TeamDTO): Promise<UpdateResult> {
        try{

            const modify = await this.TeamRepository.updateTeam(idTeam, teamDTO);

            return modify;
        }
        catch(err) {
            
            throw err;
        }
    }

    async deleteTeam(idTeam: number): Promise<DeleteResult> {
        try{

            const deleted = await this.TeamRepository.deleteTeam(idTeam);

            return deleted;
        }
        catch(err) {
            
            throw err;
        }
    }

    
    

    


    
}