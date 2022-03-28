import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/auth.service';
import { PLayerDTO } from 'src/app/profile-player/DTO/playerDTO';
import { RoleEnum } from 'src/app/roles.enum';
import { TeamDTO } from '../DTO/teamDTO';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  auth_token: any;

  constructor(private http: HttpClient, private authService: AuthenticationService, private router: Router) {

    this.auth_token = this.authService.getToken();

   }

  deleteTeam(){
    return this.http.delete<any>("http://localhost:3000/api/teams/delete", { headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${this.auth_token}`} }).subscribe(
      () => { 
        this.router.navigate(["/teams"]);
      }
    )
  }

  leaveTeam(){
    return this.http.delete<any>("http://localhost:3000/api/players/leave_team", { headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${this.auth_token}`} }).subscribe(
    () => {
      this.router.navigate(["/teams"]);
    }
    );
  }

  banPlayer(idPlayer: number){
    return this.http.post<any>("http://localhost:3000/api/teams/ban", {idPlayer : idPlayer}, { headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${this.auth_token}`} });
  }

  setAsCaptain(idPlayer: number){
    return this.http.post<any>("http://localhost:3000/api/teams/setas_captain", { idPlayer : idPlayer}, { headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${this.auth_token}`} });
  }

  updateTeam(teamDTO: TeamDTO){
    return this.http.put<any>("http://localhost:3000/api/teams/modify",teamDTO, { headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${this.auth_token}`} }).subscribe(
      () => {
        
      }
    )

  }
  getListofInvitedPlayers(){
    return this.http.get<any>("http://localhost:3000/api/invitations/my_team", { headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${this.auth_token}`}});
  }

  getListOfJoinRequests(idTeam: number){
    return this.http.post<any>("http://localhost:3000/api/joinrequests/team", { teamId: idTeam}, { headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${this.auth_token}`}});
  }

  createJoinRequest(idPlayer: number, idTeam: number, role: RoleEnum){
    return this.http.post<any>("http://localhost:3000/api/joinrequests", { player: idPlayer, team: idTeam, role: role}, { headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${this.auth_token}`}});

  }

  acceptJoinRequest(idRequest: number){
    return this.http.post<any>("http://localhost:3000/api/joinrequests/accept", { joinRequestId : idRequest}, { headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${this.auth_token}`}});
  }

  declineJoinRequest(idRequest: number){
    return this.http.delete<any>(`http://localhost:3000/api/joinrequests/refuse/${idRequest}`, { headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${this.auth_token}`}});
  }
  
}
