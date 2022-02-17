import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { from, Observable } from "rxjs";
import { PlayerInterface } from "src/players/models/player.interface";
import { Repository } from "typeorm";
import { Team } from "../models/teams.entity";
import { TeamInterface } from "../models/teams.interface";

@Injectable()
export class TeamsService {
    constructor(
        @InjectRepository(Team)
        private readonly TeamRepository : Repository<Team>
    ){}

    createTeam(team: TeamInterface): Observable<TeamInterface>{
        return from(this.TeamRepository.save(team));
    }
}