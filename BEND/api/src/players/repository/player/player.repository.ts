import { ModuleCompiler } from "@nestjs/core/injector/compiler";
import { PlayerDTO } from "src/players/DTO/player/playerDTO";
import { RoleEnum } from "src/players/enum/role.enum";
import { PlayerInterface } from "src/players/interfaces/player.interface";
import { Player } from "src/players/models/player/player.entity";
import { Profile } from "src/players/models/profile/profile.entity";
import { TeamDTO } from "src/teams/DTO/teamDTO";
import { DeleteResult, getConnection, getRepository, IsNull, Repository, UpdateEvent, UpdateResult } from "typeorm";
import { isNull } from "util";


export class PlayerRepository extends Repository<Player> {

     addPlayer(player: PlayerDTO): Promise<PlayerInterface> {
        const playerRepo = getRepository(Player);
        return  playerRepo.save(player); 
    }
     savePlayer(player: PlayerDTO): Promise<PlayerInterface> {
        const playerRepo = getRepository(Player);

        return  playerRepo.save(player);
    }
  
    //---------------------------------------------
     getOne(idPlayer: number): Promise<Player> {
        const playerRepo = getRepository(Player);

        return  playerRepo.findOneOrFail(idPlayer,
            { relations: ["team"]});
    }

     getOneByName(playerName: string): Promise<Player>{
        const playerRepo = getRepository(Player);

        return  playerRepo.findOneOrFail(
            {name : playerName},
            {relations: ["team"]},
        );
    }

     getAll(): Promise<PlayerInterface[]> {
        const playerRepo = getRepository(Player);

        return  playerRepo.find({
            withDeleted: true,
            relations: ["team"],
            select: ["id", "name", "team"],
            order: { id: "ASC"}
        });
    }

     getNumberOfPlayers(): Promise<number> {
        const playerRepo = getRepository(Player);

        return  playerRepo.count();

    }
     getAllByRoleAndFree(roleOfPlayer: RoleEnum): Promise<PlayerInterface[]> {
        const playerRepo = getRepository(Player);

        return  playerRepo.find({
            withDeleted:true,
            where: {
                profile :{
                role: roleOfPlayer,
                },
                team: IsNull()
            },
            relations: ["profile"]
        })
    }

     getAllFree(): Promise<PlayerInterface[]> {
        const playerRepo = getRepository(Player);

        return  playerRepo.find({
            withDeleted:true,
            where: {
                team: IsNull()
            },
            order: {
                id: "ASC"
            }
        })
    } 
    //-----------------------------------------------

     updatePlayer(idPlayer: number, playerDTO: PlayerDTO): Promise<UpdateResult> {
        const playerRepo = getRepository(Player);
    
        return  playerRepo.update(idPlayer, playerDTO);
    }

    //-----------------------------------------------

     async delPlayer(idPlayer: number): Promise <DeleteResult> {
        const playerRepo = getRepository(Player);
        const profileRepo = getRepository(Profile);
        const player = await playerRepo.findOne(idPlayer);
        const profile =  player.profile;

        profileRepo.delete(profile);
        return  playerRepo.delete(player);   
    }

}