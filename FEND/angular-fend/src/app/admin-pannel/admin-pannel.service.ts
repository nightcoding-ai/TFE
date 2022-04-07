import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminPannelService {

  baseAPIURL : string = "http://localhost:3000/api/";

  constructor(private http: HttpClient) { }

  getPlayersList() {
    return this.http.get<any>(this.baseAPIURL + 'players/all');
  }

  getAllTeamsList() {
    return this.http.get<any>(this.baseAPIURL + 'teams/all');
  }

  getFreePlayers() {
    return this.http.get<any>(this.baseAPIURL + 'players/free');
  }
}
