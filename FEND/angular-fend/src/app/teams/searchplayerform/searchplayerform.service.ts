import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from 'src/app/auth/auth.service';
import { PLayerDTO } from 'src/app/profile-player/DTO/playerDTO';
import { RoleEnum } from 'src/app/roles.enum';

@Injectable({
  providedIn: 'root'
})
export class SearchplayerformService {

  auth_token: any;

  constructor(private http: HttpClient, private authService: AuthenticationService) {

    this.auth_token = this.authService.getToken();

   }

  searchFreePlayersByRole(role: RoleEnum) {
    return this.http.post<any>("http://localhost:3000/api/players/all_by_role", { "role" : role}, { headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${this.auth_token}`}});
  }

  invitePlayer(idPlayer: number, idTeam: number, role: RoleEnum) {
    return this.http.post<any>("http://localhost:3000/api/invitations", { "team" : idTeam, "player": idPlayer, "role": role}, { headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${this.auth_token}`}});
  }
}
