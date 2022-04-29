import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfilePlayerService {


  readonly baseAPIUrl = "http://localhost:3000/api";

  constructor(private http: HttpClient) { }

  getUserInfos(idPlayer: number) {
    return this.http.get<any>(`${this.baseAPIUrl}/players/single/${idPlayer}`);
  }

  getPlayerProfile() {
    return this.http.get<any>(`${this.baseAPIUrl}/players/my_profile`);
  }

  updatePlayer(idPlayer: number, updatePlayerDTO: any) {
    console.log(updatePlayerDTO);
    return this.http.put<any>(`${this.baseAPIUrl}/players/${idPlayer}/update`, updatePlayerDTO);
  }

  updatePlayerProfile(idPlayer: number, updatePlayerProfileDTO: any) {
    return this.http.put<any>(`${this.baseAPIUrl}/players/${idPlayer}/update/profile`, updatePlayerProfileDTO)
  }

  deleteOldPlayerPp(filePath: string) {
    console.log("suppression de l'ancienne pp frontend")
    console.log(filePath);
    return this.http.delete<any>(`${this.baseAPIUrl}/players/images/${filePath}`);
  }
}
