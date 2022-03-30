import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from '../auth/auth.service';
import { ProfilePlayerService } from '../profile-player/profile-player.service';

interface Notification {
  id?: number,
  idEquipe?: number,
  idPlayer?: number,
}

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  helper = new JwtHelperService();
  player: any;
  tokenDecoded: any;
  token: any;
  notification: any[] = [];
  notifications$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(this.notification);
  apiURLBase = "http://localhost:3000/api/";
  apiURLNotif = `${this.apiURLBase}invitations/mine`;

  constructor(private http: HttpClient, private authService: AuthenticationService, private profileService: ProfilePlayerService) { 
  }

  getNotifications(){
    console.log(this.authService.token);
    return this.http.get<any>("http://localhost:3000/api/invitations/mine", { headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${this.authService.token}`}});
  }

  deleteAllNotifs(){

    return this.http.delete<any>("http://localhost:3000/api/invitations/remove_all", { headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${this.authService.token}`}});
  }

  deleteNotif(idNotif: number){

    return this.http.delete<any>(`http://localhost:3000/api/invitations/delete/${idNotif}`,{ headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${this.authService.token}`}});
  }

  acceptNotif(idNotif: number){
    return this.http.post<any>(`http://localhost:3000/api/invitations/accept`,{ idNotif: idNotif}, { headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${this.authService.token}`}});
  }

 
  
}
