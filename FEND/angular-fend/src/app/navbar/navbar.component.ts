import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

import {MenubarModule} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';
import { faBars, faBell, faEnvelope, faGear, faXmark } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from '../auth/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { PLayerDTO } from '../profile-player/DTO/playerDTO';
import { ProfilePlayerService } from '../profile-player/profile-player.service';
import { Subject, Subscription } from 'rxjs';
import { MatBadgeModule } from '@angular/material/badge';
import { TeamService } from '../teams/team/team.service';
import { NotificationsService } from '../temp/notifications.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  MaterialComponents = [
    MatBadgeModule
  ]

  faBars = faBars;

  faGear = faGear;

  faBell = faBell;

  helper = new JwtHelperService();

  tokenDecoded : any;

  player: PLayerDTO;

  faEnveloppe = faEnvelope;

  updatePlayerSubject: Subscription;

  notifications : any;

  faXmark = faXmark;

  isNotifsSeen : boolean = false;




  

  
  constructor(public authService: AuthenticationService, private router: Router, private profilePlayerService: ProfilePlayerService, private teamService: TeamService, private notificationService: NotificationsService) { }

  ngOnInit(): void {
   
    this.notificationService.getNotifications().subscribe((res) => {
      this.notifications = res;

    })

    let token = this.authService.getToken();
    if(token){
      this.getDecodedAccesToken(token);

      this.profilePlayerService.getUserInfos(this.tokenDecoded.id).subscribe(
        (res) => this.player = res
      ) 
    }
  }

  getAuthUser() {

    let token = this.authService.getToken();

    if(token){
      this.getDecodedAccesToken(token);
      if(this.player && this.player.id !== this.tokenDecoded.id){
        this.profilePlayerService.getUserInfos(this.tokenDecoded.id).subscribe(
          (res) => this.player = res
        )
      }
    }
    return token;

  }
  
  
  getDecodedAccesToken(tokenToDecode: string): any {
    try {
      this.tokenDecoded = this.helper.decodeToken(tokenToDecode);
      return this.tokenDecoded;
      
    } catch(err) {
      return null;
    }

  }

  myTeamSelect(teamId: number){

    this.router.navigate(['/teams',teamId])
  }

  OnDeclineOffer(notifId: number){
    
    this.notificationService.deleteNotif(notifId);
  }

  OnAcceptOffer(notifId: number){
    console.log("acceptance");

    this.notificationService.acceptNotif(notifId).subscribe((res) => console.log(res))
  }

  deleteAllNotifs(){
    this.notificationService.deleteAllNotifs();
    this.notificationService.getNotifications().subscribe((res) => this.notifications = res);
  }

  onLogOut(){
    return this.authService.logout();
  }

  onOpenNotifs(){
    this.isNotifsSeen = true;
  }
}
