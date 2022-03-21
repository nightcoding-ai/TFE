import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faFaceFrown } from '@fortawesome/free-solid-svg-icons';
import { PLayerDTO } from 'src/app/profile-player/DTO/playerDTO';
import { RoleEnum } from 'src/app/roles.enum';
import { TeamService } from '../team/team.service';
import { SearchplayerformService } from './searchplayerform.service';

@Component({
  selector: 'app-searchplayerform',
  templateUrl: './searchplayerform.component.html',
  styleUrls: ['./searchplayerform.component.css']
})
export class SearchplayerformComponent implements OnInit {

  data : any;

  freePlayers: any;


  faFaceFrown = faFaceFrown;

  clicked = false;


  constructor(@Inject(MAT_DIALOG_DATA) private givenData: any, private searchPlayerService: SearchplayerformService, private teamService: TeamService) { }

  ngOnInit(): void {

    this.data = this.givenData;
  
    this.freePlayers = this.searchPlayerService.searchFreePlayersByRole(this.data.role).subscribe(
    (res) => {
          if(res){
            this.freePlayers = res
          }else
            return
    })

    

    
    
  }

  OnInvitePlayer(idPlayer: number, idTeam: number, role: RoleEnum){
    return this.searchPlayerService.invitePlayer(idPlayer, idTeam, role).subscribe((res) => console.log(res))
  
  
  }

  
}
