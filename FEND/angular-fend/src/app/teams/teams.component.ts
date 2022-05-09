import { Component, Input, OnInit } from '@angular/core';
import { TeamsService } from './teams.service';
import { RoleEnum } from '../roles.enum';
import { Router } from '@angular/router';
import { RankEnum } from '../ranks.enum';
import { faAngleDown, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Team } from '../interfaces/team.interface';


@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
  
})
export class TeamsComponent implements OnInit {

  teams?: Team[] = [];
  roleEnum = RoleEnum;
  rankEnum = RankEnum;
  team: Team;
  faUser = faUser;
  faUsers = faUsers;
  faAngleDown = faAngleDown;

  constructor(
    private teamService: TeamsService, 
    private router: Router
  ){ }


  ngOnInit(): void {
      this.getTeamsWithPlayersInfo(); 
      console.log(this.teams);
  }
  
  

  getTeamsWithPlayersInfo(): any {
    return this.teamService.getTeamsWithPlayers().subscribe((res) => {
      this.teams = res;
    });
  }

  onSelect(idTeam: number): void {
    this.router.navigate(['/teams',idTeam]);
  }

 

}
