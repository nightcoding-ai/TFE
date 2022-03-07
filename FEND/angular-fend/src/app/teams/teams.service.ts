import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player, Team, TeamWithPlayers } from './teams.interface';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  readonly baseAPIUrl = "http://localhost:3000/api";



  
  constructor(private http: HttpClient) { }

  

  getTeamsWithPlayers(){
    return this.http.get<any>(this.baseAPIUrl + "/teams/all").pipe(
      map((res: TeamWithPlayers[]) => {
        for(let i = 0; i < res.length; i++){
          let missingPlayers = 5 - res[i].players.length;
          for(let j = missingPlayers; j > 0; j--){
            res[i].players.push(null as Player);
            console.log(res[i]);
          }
        }
        console.log(res);
        return res;
      })
    );
  }

  getTeamByID(idTeam: number){
    return this.http.get<any>(this.baseAPIUrl + `/teams/single/${idTeam}`);


  }

}


