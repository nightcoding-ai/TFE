import { Team } from "src/teams/models/teams.entity";
import { PlayerInfo } from "./playerinfos.entity";

export interface PlayerInterface {

    id?: number;

    name: string;

    playerInfo : PlayerInfo;

    team: Team;



}

