import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { from, Observable } from "rxjs";
import { Repository } from "typeorm";
import { PlayerInterface } from "../models/player.interface";
import { Player } from "../models/players.entity";

@Injectable()
export class PlayersService {
    constructor(
        @InjectRepository(Player)
        private readonly PlayerRepository : Repository<Player>
    ){}

    getAllPlayers(): Observable<PlayerInterface[]>{
        return from(this.PlayerRepository.find());

    }

    getSinglePlayer(idPlayer: number): Observable<PlayerInterface>{
        return from(this.PlayerRepository.findOne(idPlayer))
    }    
    createPlayer(player: PlayerInterface): Observable<PlayerInterface>{
        return from(this.PlayerRepository.save(player));
    }

}
