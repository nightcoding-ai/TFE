import { ChangeDetectorRef, Component, Inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faAngleDoubleRight, faArrowRightFromBracket, faBan, faCrown, faDigitalTachograph, faPen, faPencilRuler, faPenClip, faPenToSquare, faPlus, faQuestion, faTrashCan, faTriangleExclamation, faUser, faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/auth/auth.service';
import { PLayerDTO } from 'src/app/profile-player/DTO/playerDTO';
import { ProfilePlayerService } from 'src/app/profile-player/profile-player.service';
import { RankEnum } from 'src/app/ranks.enum';
import { RoleEnum } from 'src/app/roles.enum';
import { CreateTeamFormComponent } from '../create-team-form/create-team-form.component';
import { DeleteteamformComponent } from '../deleteteamform/deleteteamform.component';
import { Player, Team, TeamWithPlayers } from '../teams.interface';
import { TeamsService } from '../teams.service';
import { MatDialog } from '@angular/material/dialog';
import { LeaveteamComponent } from '../leaveteam/leaveteam.component';
import { UpdateteamComponent } from '../updateteam/updateteam.component';
import { SearchplayerformComponent } from '../searchplayerform/searchplayerform.component';
import { BanplayerComponent } from '../banplayer/banplayer.component';
import { JoinTeamFormComponent } from '../join-team-form/join-team-form.component';
import { NavbarComponent } from 'src/app/navbar/navbar.component';
import { TeamService } from './team.service';
import { SetascaptainComponent } from '../setascaptain/setascaptain.component';
import { InvitedPlayersComponent } from '../invited-players/invited-players.component';
import { JoinrequestlistComponent } from '../joinrequestlist/joinrequestlist.component';



@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  team: TeamWithPlayers;

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

  player: PLayerDTO;

  joinRequests: any;

 

  constructor(private route : ActivatedRoute,
      private teamService:TeamsService,
      private myTeamservice: TeamService,
      private authService: AuthenticationService,
      private profilePlayerService: ProfilePlayerService,
      private dialog : MatDialog,
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe((data:any) => {

    this.idTeam = parseInt(data.id);
    console.log(typeof(this.idTeam));


    })


    let token = this.authService.getToken();

    if(token){
      this.getDecodedAccesToken(token);

      this.profilePlayerService.getUserInfos(this.tokenDecoded.id).subscribe(
        (res) => this.player = res
      )
      this.getTeam(this.idTeam);
      

    }

    this.getTeam(this.idTeam);

    if(this.team && this.player.team !== undefined&& this.player.team.id === this.team.id){

      this.myTeamservice.getListofInvitedPlayers().subscribe(
        (res) => {
          this.invitations = res;
        }
      )
      
    }

    
      this.myTeamservice.getListOfJoinRequests(this.idTeam).subscribe(
        (res) => {
          console.log(res);
          this.joinRequests = res;
        }
      );
    
    
  }

  
  getTeam(id: number) {

    this.teamService.getTeamByID(id).subscribe((res) => {

      this.team = res;


    }) 
  }

  getPlayerByRole(role: RoleEnum){
    
    return this.team.players.find((player) => player.profile.role === role)
    
  
  }

  makeCaptain(idPlayer: number, idTeam: number){
    console.log(idPlayer, idTeam);
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
    this.dialog.open(LeaveteamComponent);
  }

  onOpenDialogUpdateTeamInfo(){
    this.dialog.open(UpdateteamComponent);
  }

  onOpenDialogSearchPlayer(role: any){
    this.dialog.open(SearchplayerformComponent, { data: {
      role: role,
      teamID: this.team.id
    }, width: '600px', height: '600px'});
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
    if(this.player.profile.isCaptain && idPlayer !== this.player.id){
      this.dialog.open(SetascaptainComponent, { data: {
      id: idPlayer,
      name: playerName
    }})
    };
    return;
  }

  onOpenDialogPlayersWantingToJoin(){
    this.dialog.open(JoinrequestlistComponent, { data: {
      team: this.team,
      roles: this.roles,
      joinRequests: this.joinRequests

    }})
  }


 

}
