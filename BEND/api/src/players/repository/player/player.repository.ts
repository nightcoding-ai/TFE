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

    async addPlayer(player: PlayerDTO): Promise<PlayerInterface> {
        const playerRepo = getRepository(Player);

        return await playerRepo.save(player); 
    }
    async savePlayer(player: PlayerDTO): Promise<PlayerInterface> {
        const playerRepo = getRepository(Player);

        return await playerRepo.save(player);
    }
  
    //---------------------------------------------
    async getOne(idPlayer: number): Promise<Player> {
        const playerRepo = getRepository(Player);

        return await playerRepo.findOneOrFail(idPlayer,
            { relations: ["team"]});
    }

    async getOneByName(playerName: string): Promise<Player>{
        const playerRepo = getRepository(Player);

        return await playerRepo.findOneOrFail(
            {name : playerName},
            {relations: ["team"]},
        );
    }

    async getAll(): Promise<PlayerInterface[]> {
        const playerRepo = getRepository(Player);

        return await playerRepo.find({
            withDeleted: true,
            relations: ["team"],
            select: ["id", "name", "team"],
            order: { id: "ASC"}
        });
    }

    async getNumberOfPlayers(): Promise<number> {
        const playerRepo = getRepository(Player);

        return await playerRepo.count();

    }
    async getAllByRoleAndFree(roleOfPlayer: RoleEnum): Promise<PlayerInterface[]> {
        const playerRepo = getRepository(Player);

        return await playerRepo.find({
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

    async getAllFree(): Promise<PlayerInterface[]> {
        const playerRepo = getRepository(Player);

        return await playerRepo.find({
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

    async updatePlayer(idPlayer: number, playerDTO: PlayerDTO): Promise<UpdateResult> {
        const playerRepo = getRepository(Player);
    
        return await playerRepo.update(idPlayer, playerDTO);
    }

    //-----------------------------------------------

    async delPlayer(idPlayer: number): Promise <DeleteResult> {
        const playerRepo = getRepository(Player);
        const profileRepo = getRepository(Profile);
        const player = await playerRepo.findOne(idPlayer);
        const profile = player.profile;

        await profileRepo.delete(profile);
        return await playerRepo.delete(player);   
    }

}