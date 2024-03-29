import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Team } from '../interfaces/team.interface';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  readonly baseAPIUrl = "http://localhost:3000/api";
  
  constructor(
    private http: HttpClient
  ) { }

  getTeamsWithPlayers(){
    return this.http.get<any>(this.baseAPIUrl + "/teams");
  }

  getTeamByID(idTeam: number){
    return  this.http.get<Team>(this.baseAPIUrl + `/teams/single/${idTeam}`);
  }

}


