import { DeleteResult, EntityRepository, getConnection, getRepository, IsNull, Repository, UpdateEvent, UpdateResult } from "typeorm";
import { CreatePlayerDTO } from "../../DTO/player/createPlayerDTO";
import { RoleEnum } from "../../enum/role.enum";
import { UserType } from "../../enum/userType.enum";
import { Player } from "../../models/player/player.entity";
import { Profile } from "../../models/profile/profile.entity";

@EntityRepository(Player)
export class PlayerRepository extends Repository<Player> {


    addPlayer(player: CreatePlayerDTO): Promise<Player> {
        const playerRepo =  getRepository(Player);
        return  playerRepo.save(player); 
    }
    savePlayer(player: CreatePlayerDTO): Promise<Player> {
        const playerRepo =  getRepository(Player);
        return  playerRepo.save(player);
    }
    getOne(idPlayer: number): Promise<Player> {
        const playerRepo =  getRepository(Player);
        return playerRepo.findOneOrFail(idPlayer,{ 
            relations: ["team"]
        });
    }

    getOneByName(playerName: string): Promise<Player>{
        const playerRepo =  getRepository(Player);
        return  playerRepo.findOneOrFail({
            name : playerName 
            },
            {
            relations: ["team"]
            }
        );
    }

    getAll(): Promise<Player[]> {
        const playerRepo =  getRepository(Player);
        return  playerRepo.find({
            withDeleted: true,
            relations: ["team"],
            select: ["id", "name", "team"],
            order: { id: "ASC"}
        });
    }

    getNumberOfPlayers(): Promise<number> {
        const playerRepo =  getRepository(Player);
        return playerRepo.count();

    }

    getAllByRoleAndFree(roleOfPlayer: RoleEnum): Promise<Player[]> {
        const playerRepo =  getRepository(Player);
        return  playerRepo.find({
            withDeleted:true,
            where: {
                profile :{
                role: roleOfPlayer,
                },
                team: IsNull()
            },
            relations: ["profile"]
        });
    }

    getAllFree(): Promise<Player[]> {
        const playerRepo =  getRepository(Player);
        return  playerRepo.find({
            withDeleted:true,
            where: {
                team: IsNull()
            },
            order: {
                id: "ASC"
            }
        });
    } 

    updatePlayer(idPlayer: number, player: any): Promise<UpdateResult> {
        const playerRepo = getRepository(Player);
        return  playerRepo.update(idPlayer, player);
    }

    async deleteOne(idPlayer: number): Promise <DeleteResult> {
        const playerRepo = getRepository(Player);
        const profileRepo = getRepository(Profile);
        const player = await playerRepo.findOne(idPlayer);
        const profile =  player.profile;
        profileRepo.delete(profile);
        return  playerRepo.delete(player);   
    }

    async isAdmin(idPlayer: number): Promise<boolean> {
        const playerRepo =  getRepository(Player);
        const p = await playerRepo.findOneOrFail(idPlayer);
        return p.userType === UserType.ADMIN ? true: false;
    }
}