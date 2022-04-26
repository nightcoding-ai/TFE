import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/auth.service';
import { RoleEnum } from 'src/app/roles.enum';
import { TeamDTO } from '../DTO/teamDTO';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(
    private http: HttpClient, 
    private router: Router
  ) { }

  deleteTeam() {
    return this.http.delete<any>("http://localhost:3000/api/teams/delete").subscribe(
      () => { 
        this.router.navigate(["/teams"]);
      }
    )
  }

  leaveTeam() {
    return this.http.delete<any>("http://localhost:3000/api/players/leave_team").subscribe(
    () => {
      this.router.navigate(["/teams"]);
    }
    );
  }

  banPlayer(idPlayer: number) {
    return this.http.post<any>("http://localhost:3000/api/teams/ban", {idPlayer : idPlayer});
  }

  setAsCaptain(idPlayer: number) {
    return this.http.post<any>("http://localhost:3000/api/teams/setas_captain", { idPlayer : idPlayer});
  }

  updateTeam(teamDTO: TeamDTO) {
    return this.http.put<any>("http://localhost:3000/api/teams/modify",teamDTO);

  }
  getListofInvitedPlayers() {
    return this.http.get<any>("http://localhost:3000/api/invitations/my_team");
  }

  getListOfJoinRequests(idTeam: number) {
    return this.http.post<any>("http://localhost:3000/api/joinrequests/team", { teamId: idTeam});
  }

  createJoinRequest(idPlayer: number, idTeam: number, role: RoleEnum) {
    return this.http.post<any>("http://localhost:3000/api/joinrequests", { player: idPlayer, team: idTeam, role: role});

  }

  acceptJoinRequest(idRequest: number) {
    return this.http.post<any>("http://localhost:3000/api/joinrequests/accept", { joinRequestId : idRequest});
  }

  declineJoinRequest(idRequest: number) {
    return this.http.delete<any>(`http://localhost:3000/api/joinrequests/refuse/${idRequest}`);
  }

  getMatches(idTeam: number) { 
    return this.http.get<any>(`http://localhost:3000/api/tournaments/${idTeam}/matches`);
  }
  
}
