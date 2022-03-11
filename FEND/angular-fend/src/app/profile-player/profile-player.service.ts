import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfilePlayerService {


  readonly baseAPIUrl = "http://localhost:3000/api";

  constructor(private http: HttpClient) { }

  getUserInfos(idPlayer: number){
    return this.http.get<any>(`${this.baseAPIUrl}/players/single/${idPlayer}`);
  }
}
