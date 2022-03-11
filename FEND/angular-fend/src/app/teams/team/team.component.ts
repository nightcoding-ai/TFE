import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faArrowRightFromBracket, faBan, faCrown, faDigitalTachograph, faPen, faPencilRuler, faPenClip, faPenToSquare, faTrashCan, faTriangleExclamation, faUser } from '@fortawesome/free-solid-svg-icons';
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



@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  team: TeamWithPlayers;


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

  helper = new JwtHelperService();

  tokenDecoded : any;

  player: PLayerDTO;

 

  constructor(private route : ActivatedRoute, private teamService:TeamsService, private authService: AuthenticationService,private profilePlayerService: ProfilePlayerService, private dialog : MatDialog) {



     
  }

  ngOnInit(): void {

    this.route.params.subscribe((data:any) => {

    this.idTeam = data.id;

    })

    this.getTeam(this.idTeam);

    let token = this.authService.getToken();

    if(token){
      this.getDecodedAccesToken(token);

      this.profilePlayerService.getUserInfos(this.tokenDecoded.id).subscribe(
        (res) => this.player = res
      )
    }
    
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
  
  joinTeamRequest(idTeam: number){
    console.log(idTeam);
  }

  leaveTeam(idTeam:number){
    console.log(idTeam);
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
    this.dialog.open(SearchplayerformComponent, { data: role});
  }

 

}
