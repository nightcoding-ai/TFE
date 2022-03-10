import { ModuleCompiler } from "@nestjs/core/injector/compiler";
import { PlayerDTO } from "src/players/DTO/player/playerDTO";
import { Player } from "src/players/models/player/player.entity";
import { Profile } from "src/players/models/profile/profile.entity";
import { TeamDTO } from "src/teams/DTO/teamDTO";
import { DeleteResult, getConnection, getRepository, Repository, UpdateEvent, UpdateResult } from "typeorm";


export class PlayerRepository extends Repository<Player> {

    

    async addPlayer(player: Player): Promise<void> {


        const playerRepo = getRepository(Player);

        await playerRepo.save(player);
        



        
    }

    async savePlayer(player: any): Promise<any> {

        const playerRepo = getRepository(Player);

       
        const saved = await playerRepo.save(player);
        
        console.log("SavePlayer",saved);

        return saved;
        

    }

    async delPlayer(idPlayer: number): Promise <DeleteResult> {

        const playerRepo = getRepository(Player);

        const profileRepo = getRepository(Profile);


        const player = await playerRepo.findOne(idPlayer);

        const profile = player.profile;
        

        await profileRepo.delete(profile);

        return await playerRepo.delete(player);

         
    }

    async getOne(idPlayer: number): Promise<Player> {
        
        const playerRepo = getRepository(Player);

        const player = await playerRepo.findOneOrFail(idPlayer);

        return player;
    }

    async getOneByName(playerName: string): Promise<Player>{

        const playerRepo = getRepository(Player);

        const player = await playerRepo.findOne({ name: playerName});

        return player;

    }
    async getAll(): Promise<PlayerDTO[]> {

        const playerRepo = getRepository(Player);

        const players = playerRepo.find();

        return players;
    }

   

    async updatePlayer(idPlayer: number, playerDTO: PlayerDTO): Promise<UpdateResult> {

        const playerRepo = getRepository(Player);
        
        console.log(playerDTO);
        
        const update = playerRepo.update(idPlayer, playerDTO);

        
        return update;
    
    
    
    
    }

}