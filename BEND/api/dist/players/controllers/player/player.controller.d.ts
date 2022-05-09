import { StreamableFile, UnauthorizedException } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreatePlayerDTO } from '../../DTO/player/createPlayerDTO';
import { FreePlayerDTO } from '../../DTO/player/freePlayerDTO';
import { PlayerDTO } from '../../DTO/player/playerDTO';
import { PlayerProfileDTO } from '../../DTO/player/playerProfileDTO';
import { Player } from '../../models/player/player.entity';
import { PlayersService } from '../../providers/player/player.service';
export declare class PlayersController {
    private readonly PlayersService;
    constructor(PlayersService: PlayersService);
    create(player: CreatePlayerDTO): Promise<Player>;
    getFile(pp: string): StreamableFile;
    deleteFile(filename: any): void;
    uploadSingle(file: any): {
        filePath: string;
    };
    getPicture(filename: any, res: any): Promise<void>;
    getMyProfileInformations(req: any): Promise<PlayerProfileDTO>;
    getOne(idPlayer: number): Promise<PlayerDTO>;
    getAll(): Promise<PlayerDTO[]>;
    getAllFree(): Promise<FreePlayerDTO[]>;
    getNumberOfPlayer(): Promise<number>;
    getAllByRoleAndFree(req: any): Promise<PlayerDTO[]>;
    updateProfile(id: number, req: any): Promise<UpdateResult | UnauthorizedException>;
    updatePlayer(id: number, req: any): Promise<UpdateResult | UnauthorizedException>;
    leaveTeam(req: any): Promise<Player>;
    delete(idPlayer: number, req: any): Promise<DeleteResult | UnauthorizedException>;
    deleteProfilePicture(req: any): Promise<DeleteResult | null>;
}
