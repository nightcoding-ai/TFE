import { ChangeDetectorRef, Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faAngleDoubleRight, faArrowRightFromBracket, faBan, faCrown, faDigitalTachograph, faPen, faPencilRuler, faPenClip, faPenToSquare, faPlus, faQuestion, faTrashCan, faTriangleExclamation, faUser, faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/auth/auth.service';
import { ProfilePlayerService } from 'src/app/profile-player/profile-player.service';
import { RankEnum } from 'src/app/ranks.enum';
import { RoleEnum } from 'src/app/roles.enum';
import { DeleteteamformComponent } from '../deleteteamform/deleteteamform.component';
import { TeamsService } from '../teams.service';
import { MatDialog } from '@angular/material/dialog';
import { LeaveteamComponent } from '../leaveteam/leaveteam.component';
import { UpdateteamComponent } from '../updateteam/updateteam.component';
import { SearchplayerformComponent } from '../searchplayerform/searchplayerform.component';
import { BanplayerComponent } from '../banplayer/banplayer.component';
import { JoinTeamFormComponent } from '../join-team-form/join-team-form.component';
import { TeamService } from './team.service';
import { SetascaptainComponent } from '../setascaptain/setascaptain.component';
import { JoinrequestlistComponent } from '../joinrequestlist/joinrequestlist.component';
import { forkJoin, Subject, takeUntil } from 'rxjs';



@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  invitations: any;
  roles = [
    RoleEnum.Toplaner, 
    RoleEnum.Jungler, 
    RoleEnum.Midlaner, 
    RoleEnum.ADC, 
    RoleEnum.Support
  ];
  rankEnum = RankEnum;
  idTeam: number;
  roleEnum = RoleEnum;
  faDiscord = faDiscord;
  faCrown = faCrown;
  faUser = faUser;
  faTrianglExclamation = faTriangleExclamation;
  faBan = faBan;
  faArrowRight = faArrowRightFromBracket;
  faPenLine = faPenToSquare;
  faTrashCan = faTrashCan;
  faQuestion = faQuestion;
  faAngles = faAngleDoubleRight;
  faPlus = faPlus;
  faUserCheck= faUserCheck;
  helper = new JwtHelperService();
  tokenDecoded : any;
  player: any;
  joinRequests: any;
  team: any;
  matches: any;
  private destroyed$: Subject<void>;

  constructor(
    private route : ActivatedRoute,
    private teamService:TeamsService,
    private myTeamservice: TeamService,
    private authService: AuthenticationService,
    private profilePlayerService: ProfilePlayerService,
    private dialog : MatDialog,
    
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((data:any) => {
      this.idTeam = parseInt(data.id);
    })
    let token = this.authService.token;
    if(token){
      this.profilePlayerService.getUserInfos(this.authService.id).subscribe(res => {
        this.player = res});
    }
    this.getTeam(this.idTeam).subscribe((res) => { 
      this.team = res
      if(this.team) {
        this.myTeamservice.getMatches(this.team.id).subscribe(
          (res) => {
            this.matches = res;
          }
        )
      }
      if(token && this.team && this.player && this.player.isCaptain && this.team.id === this.player.teamId){
        this.myTeamservice.getListOfJoinRequests(this.player.teamId).subscribe(
          (res) => {
            this.joinRequests = res;
          }
        ); 
      }
      
    })
  }

  getTeam(id: number) {
    return this.teamService.getTeamByID(id);
  }

  getPlayerByRole(role: RoleEnum){
    return this.team.players.find((player) => player.role === role)
  }

  getDecodedAccesToken(tokenToDecode: string): any {
    try {
      this.tokenDecoded = this.helper.decodeToken(tokenToDecode);
      return this.tokenDecoded;
    } catch(err) {
      return null;
    }
  }

  onOpenDialogDeleteTeam(){
    this.dialog.open(DeleteteamformComponent);
  }

  onOpenDialogLeaveTeam(){
    this.dialog.open(LeaveteamComponent, { data : {
      team: this.team,
      player: this.player
    }});
  }

  onOpenDialogUpdateTeamInfo(){
    this.dialog.open(UpdateteamComponent);
  }

  onOpenDialogSearchPlayer(role: any){
    this.dialog.open(SearchplayerformComponent, { data: {
      role: role,
      teamID: this.team.id
    }});
  }

  onOpenDialogDeletePlayer(idPlayer: any, playerName: any){
    this.dialog.open(BanplayerComponent, { data : {
      id: idPlayer,
      name: playerName
    }});  
  }

  onOpenDialogJoinRequest(){
    this.dialog.open(JoinTeamFormComponent, { data : {
      team: this.team,
      player: this.player
    }});
  }

  onOpenDialogSetAsCaptain(idPlayer: any, playerName: any){
    if(this.player.isCaptain && idPlayer !== this.player.id){
      this.dialog.open(SetascaptainComponent, { data: {
      id: idPlayer,
      name: playerName
    }})
    };
    return;
  }

  onOpenDialogPlayersWantingToJoin(){
    this.dialog.open(JoinrequestlistComponent, { data: {
      player: this.player,
      team: this.team,
      roles: this.roles,
      joinRequests: this.joinRequests
    }})
  }
}
