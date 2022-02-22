import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TeamsService } from './teams.service';
import { Team } from './teams.interface';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
  
})
export class TeamsComponent implements OnInit {

  teams?: Team[] = [];

  

  constructor(private teamService: TeamsService){ }


  ngOnInit(): void{
      
  }
  
  getTeams(){
   this.teamService.getTeamsList().subscribe((res) => {
     this.teams = res;
     console.log(this.teams);
     
   });
  }


}
