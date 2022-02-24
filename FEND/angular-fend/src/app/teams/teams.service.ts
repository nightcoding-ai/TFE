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

  getTeamsList(){
    return this.http.get<any>(this.baseAPIUrl + '/teams');
  }

  getTeamsWithPlayers(){
    return this.http.get<any>(this.baseAPIUrl + "/teams/players").pipe(
      map((res: TeamWithPlayers[]) => {
        let missingPlayersCount = 5 - res.length;
        for(let i = missingPlayersCount; i > 0; i--){
          res.push({} as TeamWithPlayers);
        }

        return res
      })
    );
  }


  
}


