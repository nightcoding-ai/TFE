import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { CreatePlayerDTO } from "../../DTO/player/createPlayerDTO";
import { RoleEnum } from "../../enum/role.enum";
import { Player } from "../../models/player/player.entity";
export declare class PlayerRepository extends Repository<Player> {
    addPlayer(player: CreatePlayerDTO): Promise<Player>;
    savePlayer(player: CreatePlayerDTO): Promise<Player>;
    getOne(idPlayer: number): Promise<Player>;
    getOneByName(playerName: string): Promise<Player>;
    getAll(): Promise<Player[]>;
    getNumberOfPlayers(): Promise<number>;
    getAllByRoleAndFree(roleOfPlayer: RoleEnum): Promise<Player[]>;
    getAllFree(): Promise<Player[]>;
    updatePlayer(idPlayer: number, player: any): Promise<UpdateResult>;
    deleteOne(idPlayer: number): Promise<DeleteResult>;
    isAdmin(idPlayer: number): Promise<boolean>;
}
