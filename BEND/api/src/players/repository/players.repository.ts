import { Player } from "../models/players.entity";
import { PlayerInfo } from "../models/playerinfos.entity";
import { getRepository } from "typeorm";
import { PlayerInfoInterface } from "../models/playerinfos.interface";




export function readAllPlayersInfos(){

        const playerRepo = getRepository(Player);
    
        const players = playerRepo.find({
            relations: ["playerInfo"]
        
        });
    
        return players;
        }

export function  readOnePlayerInfos(idPlayer: number){

        const playerRepo = getRepository(Player);

        const player =  playerRepo.findOne({
            where: {
                id: idPlayer
            },
            relations: [
                "playerInfo"
            ]
        });

        return player;
        }



