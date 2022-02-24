import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TeamsService } from './teams.service';
import { Team, TeamWithPlayers } from './teams.interface';
import { RoleEnum } from '../roles.enum';


@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
  
})
export class TeamsComponent implements OnInit {

  teams?: Team[] = [];

  teamsWithPlayers?: TeamWithPlayers[] = [];

  roleEnum = RoleEnum;

  



  

  constructor(private teamService: TeamsService){ }


  ngOnInit(): void {

      this.getTeamsWithPlayersInfo();

      
  }
  
  getTeams() {

    this.teamService.getTeamsList().subscribe((res) => {

      this.teams = res;

      
      
    });
  }

  getTeamsWithPlayersInfo() {

    this.teamService.getTeamsWithPlayers().subscribe((res) => {

      this.teamsWithPlayers = res;

    })
  }

}
