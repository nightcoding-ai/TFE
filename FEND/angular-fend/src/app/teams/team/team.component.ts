import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faArrowRightFromBracket, faBan, faCrown, faTriangleExclamation, faUser } from '@fortawesome/free-solid-svg-icons';
import { RankEnum } from 'src/app/ranks.enum';
import { RoleEnum } from 'src/app/roles.enum';
import { Player, Team, TeamWithPlayers } from '../teams.interface';
import { TeamsService } from '../teams.service';

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


  constructor(private route : ActivatedRoute, private teamService:TeamsService) {



     
  }

  ngOnInit(): void {


    this.route.params.subscribe((data:any) => {




       this.idTeam = data.id;



    })


    this.getTeam(this.idTeam);

    
  }

  
  getTeam(id: number) {

    this.teamService.getTeamByID(id).subscribe((res) => {




      this.team = res;

      console.log("Equipe chargée",this.team);







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


 

}
