import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TeamsService } from './teams.service';
import { Team, TeamWithPlayers } from './teams.interface';
import { RoleEnum } from '../roles.enum';
import { Router } from '@angular/router';
import { RankEnum } from '../ranks.enum';
import { faAngleDown, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
  
})
export class TeamsComponent implements OnInit {

  teams?: Team[] = [];

  roleEnum = RoleEnum;

  rankEnum = RankEnum;

  team: TeamWithPlayers;

  faUser = faUser;

  faUsers = faUsers;

  faAngleDown = faAngleDown;

  

  constructor(private teamService: TeamsService, private router: Router){ }


  ngOnInit(): void {
      this.getTeamsWithPlayersInfo(); 
  }
  
  

  getTeamsWithPlayersInfo() {

    this.teamService.getTeamsWithPlayers().subscribe((res) => {
      this.teams = res;
    })
  }

  onSelect(idTeam: number){
    this.router.navigate(['/teams',idTeam]);
  }

 

}
