import { Team } from "../models/teams.entity";
import { Player } from "src/players/models/players.entity";
import { getRepository } from "typeorm";

export function getTeamsWithPlayers() {

    const teamRepo = getRepository(Team);

    const playerRepo = getRepository(Player);

    const teamPlayers = teamRepo.find({
        relations: ["players", "players.playerInfo"]
        
    })

    
    

    return teamPlayers;
}