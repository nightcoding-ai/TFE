import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  baseURLAPI = "http://localhost:3000/api/tournaments/";

  constructor(private http: HttpClient) { }

  testTournament(): Observable<any> {
    return this.http.post(`${this.baseURLAPI}start`, {tournament: 1});
  }
}
