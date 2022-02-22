import { Injectable } from "@nestjs/common";
import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm";
import { from, Observable } from "rxjs";
import { Team } from "src/teams/models/teams.entity";
import { TeamInterface } from "src/teams/models/teams.interface";
import { Connection, DeleteResult, Repository, UpdateResult } from "typeorm";
import { PlayerInterface } from "../models/player.interface";
import { PlayerInfo } from "../models/playerinfos.entity";
import { PlayerInfoInterface } from "../models/playerinfos.interface";
import { Player } from "../models/players.entity";
import { readAllPlayersInfos, readOnePlayerInfos }  from "../repository/players.repository";
const { google } = require('googleapis'); 





@Injectable()
export class PlayersService {

    constructor(

        @InjectRepository(Player)
        private readonly PlayerRepository : Repository<Player>,

        @InjectRepository(PlayerInfo)
        private readonly PlayerInfoRepository : Repository<PlayerInfo>,
    ){}


    //---------------GOOGLESHEET TO DB------------------------------

    async googleSheetDataToDB(){

      const auth = new google.auth.GoogleAuth({
        keyFile: "D:\TFE\TFE\api\src\providers\credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
        
      });

      const client = await auth.getClient();

      const googleSheets = google.sheets({version : "v4", auth: client});

      const spreadsheetID = "1YNGejlEv8z6pdsPxd545TjrryP6SyGP1wJgnkYp4Lo8";

      const metadata = await googleSheets.spreadsheets.get({
        
        auth,

        spreadsheetID,

      })

      console.log(metadata);
    }

    //--------------------END--------------------------------------

    async createPlayer(player: PlayerInterface) {

      try {

        const newPlayerInfo = player.playerInfo;
        
        await this.PlayerInfoRepository.save(newPlayerInfo);

        const newPlayer = await this.PlayerRepository.save(player);

        newPlayer.playerInfo = newPlayerInfo;

        await this.PlayerRepository.save(newPlayer);

        return newPlayerInfo;

      }catch(err) {

        throw err;
      }

      
    }

    async getAllNames(): Promise<PlayerInterface[]> {

      try {

        return await this.PlayerRepository.find();

      }
      catch(err) {

        throw err;
      }
    }

    async getAllInfosOfAllPlayers(): Promise<PlayerInterface[]> {

      try {

        const players =  await readAllPlayersInfos()

        return players;

      }
      catch(err) {

        throw err;
      }
    }

    async getAllInfosOfOnePlayer(idPlayer: number): Promise<PlayerInterface>{
      
      try {

        const player = await readOnePlayerInfos(idPlayer);

        return player;

      }
      catch(err) {

        throw err;
      }
    }

    async updateNameOfPlayer(idPlayer: number, newName: PlayerInterface): Promise<UpdateResult>{
      
      try {

        return this.PlayerRepository.update(idPlayer, newName);

      }
      catch(err) {

        throw err;
      }
    }


    async updateInformationsOfPlayer(idInfo: number,newInfos: PlayerInfo): Promise<UpdateResult>{
      
      try {

        let infos = this.PlayerInfoRepository.update(idInfo, newInfos);

        return infos;

      }
      catch(err) {

        throw err;
      }
    }

    async patchInformationsOfPlayer(idInfo: number,newInfos: PlayerInfo): Promise<UpdateResult>{
      try{

        let infos = this.PlayerInfoRepository.update(idInfo, newInfos);

        return infos;

      }
      catch(err) {

        throw err;
      }
    }


    async deleteOnePlayer(idPlayer: number){
      try {
        
        return await this.PlayerRepository.delete(idPlayer);
      }
      catch(err) {

        throw err;
      }
    }
  
    
 
}
