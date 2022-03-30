import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { captureRejections } from "events";
import { from, Observable } from "rxjs";
import { PlayerRepository } from "src/players/repository/player/player.repository";
import { ProfileRepository } from "src/players/repository/profil/profile.repository";
import { DeleteResult, Repository, UpdateResult} from "typeorm";
import { TeamDTO } from "../DTO/teamDTO";
import { Team } from "../models/teams.entity";
import { TeamRepository } from "../repository/teams.repository";

@Injectable()
export class TeamsService {
    constructor(
        
        private readonly TeamRepository: TeamRepository,

        private readonly PlayerRepository: PlayerRepository,

        private readonly ProfileRepository: ProfileRepository
        

    ){}
    
    async create(idPlayer: number, teamDTO: TeamDTO): Promise<any> {
        try {
        
            const player = await this.PlayerRepository.getOne(idPlayer);

            if(player.team || player.team !== null || player.profile.isCaptain === true){
                throw new UnauthorizedException();
            }
            else {

            const newTeam = await this.TeamRepository.addTeam(teamDTO);

            player.team = newTeam;

            player.profile.isCaptain = true;


            return await this.PlayerRepository.savePlayer(player);

             
            
            }

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

    async updateTeam(idPlayer: number, teamDTO: TeamDTO): Promise<UpdateResult> {
        try{

            const player = await this.PlayerRepository.getOne(idPlayer);

            if(!player.team || player.team === null || player.profile.isCaptain === false){
                throw new UnauthorizedException();
            }
            else {

                if(teamDTO.logo === '' || teamDTO.logo === null){
                    teamDTO.logo = player.team.logo;
                    const updatedTeam = await this.TeamRepository.updateTeam(player.team.id, teamDTO);
                    return updatedTeam;
                }
            const updatedTeam = await this.TeamRepository.updateTeam(player.team.id, teamDTO);

            return updatedTeam;
            }
            
        }
        catch(err) {
            
            throw err;
        }
    }

    async deleteTeam(idPlayer: number): Promise<DeleteResult> {
        try{

            const player = await this.PlayerRepository.getOne(idPlayer);

            if(player.profile.isCaptain !== true || player.team === null || player.team === undefined){
                throw new UnauthorizedException();
            }
            else{


                const teamID = player.team.id;

                player.team = null;
                player.profile.isCaptain = false;


                await this.PlayerRepository.savePlayer(player);

                const deleted = await this.TeamRepository.deleteTeam(teamID);


                 return deleted;


            }
        }
        catch(err) {
            
            throw err;
        }
    }

    async banPlayer(idCaptain: number, idPlayer: number): Promise<void>{
        try{
            const captain = await this.PlayerRepository.getOne(idCaptain);
            const player = await this.PlayerRepository.getOne(idPlayer);

            if(captain.profile.isCaptain === false || player.profile.isCaptain === true || player.team.id !== captain.team.id){
                throw new UnauthorizedException();
            }
            player.team = null;
            await this.PlayerRepository.savePlayer(player);

        }
        catch(err){
            throw err;
        }
    }

    async setAsCaptain(idOldCaptain: number, idNewCaptain: number){
        try{
            const oldCaptain = await this.PlayerRepository.getOne(idOldCaptain);
            const newCaptain = await this.PlayerRepository.getOne(idNewCaptain);

            if(!oldCaptain || !newCaptain || oldCaptain.profile.isCaptain === false || newCaptain.profile.isCaptain === true || oldCaptain.team.id !== newCaptain.team.id || oldCaptain.id === newCaptain.id){
                throw new UnauthorizedException();
            }

            oldCaptain.profile.isCaptain = false;
            newCaptain.profile.isCaptain = true;

            await this.PlayerRepository.savePlayer(oldCaptain);
            await this.PlayerRepository.savePlayer(newCaptain);
        }
        catch(err){

            throw err;
        }
    }
    

    


    
}