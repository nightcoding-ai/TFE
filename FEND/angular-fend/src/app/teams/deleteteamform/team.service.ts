import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/auth.service';
import { PLayerDTO } from 'src/app/profile-player/DTO/playerDTO';
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
    return this.http.delete<any>("http://localhost:3000/api/teams/delete").subscribe(
      () => { 
        this.router.navigate(["/teams"]);
      }
    )
  }

  leaveTeam(){
    return this.http.delete<any>("http://localhost:3000/api/players/leave_team").subscribe(
    () => {
      this.router.navigate(["/teams"]);
    }
    );
  }

  updateTeam(teamDTO: TeamDTO){
    return this.http.put<any>("http://localhost:3000/api/teams/modify",teamDTO).subscribe(
      () => {
        
      }
    )

  }

  getNotifications(){
    return this.http.get<any>("http://localhost:3000/api/invitations/mine");
  }

  deleteNotif(idNotif: number){
    return this.http.delete<any>(`http://localhost:3000/api/invitations/delete/${idNotif}`);
  }

  getListofInvitedPlayers(){
    return this.http.get<any>("http://localhost:3000/api/invitations/my-team", { headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${this.auth_token}`}});
  }

  
}
