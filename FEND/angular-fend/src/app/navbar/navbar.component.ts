import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { faBars, faBell, faEnvelope, faGear, faScrewdriverWrench, faUser, faXmark } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from '../auth/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { ProfilePlayerService } from '../profile-player/profile-player.service';
import { forkJoin, Subject, Subscription } from 'rxjs';
import { MatBadgeModule } from '@angular/material/badge';
import { NotificationsService } from '../temp/notifications.service';
import { Player } from '../interfaces/player.interface';
import { AuthService } from '@auth0/auth0-angular';
import { PlayerDTO } from '../profile-player/DTO/playerDTO';

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
  faXmark = faXmark;
  faAdmin= faScrewdriverWrench;
  faEnveloppe = faEnvelope;
  faUser = faUser;

  helper = new JwtHelperService();
  tokenDecoded : any;
  player: PlayerDTO;
  playerTeam: any;
  updatePlayerSubject: Subscription;
  notifications : any;
 
  isMenuCollapsed = true;
  userTypes = {
    admin: 'admin',
    user: 'user'
  };
  
  constructor(
    public authService: AuthenticationService,
    private router: Router,
    private profilePlayerService: ProfilePlayerService, 
    private notificationService: NotificationsService
  ) { }

  ngOnInit(): void {
    this.authService._isLoggedIn$.asObservable().subscribe(loggedIn => {
      if(loggedIn){
        forkJoin([
          this.notificationService.getNotifications(),
          this.profilePlayerService.getUserInfos(this.authService.id),
        ]).subscribe(res => {
          this.notifications = res[0];
          this.player = res[1];
        });
      }
    });
  }

  getAuthUser(): any {
    let token = this.authService.token;
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
  
  getDecodedAccesToken(tokenToDecode: string): any | null {
    try {
      this.tokenDecoded = this.helper.decodeToken(tokenToDecode);
      return this.tokenDecoded;
    } 
    catch(err) {
      return null;
    }
  }

  myTeamSelect(teamId: number){
    this.redirectTo('/teams/' + teamId.toString());    
  }

  redirectTo(uri: string): void {
    this.router.navigateByUrl('',{skipLocationChange: true}).then( () =>  this.router.navigate([uri]))
  }

  OnDeclineOffer(notifId: number){
    this.notificationService.deleteNotif(notifId);
  }

  OnAcceptOffer(notifId: number){
    this.notificationService.acceptNotif(notifId).subscribe((res) => console.log(res))
  }

  deleteAllNotifs(){
    this.notificationService.deleteAllNotifs();
    this.notificationService.getNotifications().subscribe((res) => this.notifications = res);
  }

  onLogOut(){
    return this.authService.logout();
  }
}
