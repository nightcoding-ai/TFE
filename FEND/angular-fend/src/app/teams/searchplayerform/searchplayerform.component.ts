import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faFaceFrown } from '@fortawesome/free-solid-svg-icons';
import { PLayerDTO } from 'src/app/profile-player/DTO/playerDTO';
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

  invitations: any ;

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

    this.teamService.getListofInvitedPlayers().subscribe(
      (res) => {
        this.invitations = res
      }
    )

    
    
  }

  OnInvitePlayer(idPlayer: number, idTeam: number){
    return this.searchPlayerService.invitePlayer(idPlayer, idTeam).subscribe((res) => console.log(res))
  
  
  }

  alreadyInvited(name: string){
    let allNames = [];

    for(let inv of this.invitations){
      allNames.push(inv.player.name);
    }

    return allNames.find(playerName => playerName === name)
  }
  
}
