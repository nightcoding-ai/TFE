import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TeamService } from '../team/team.service';

@Component({
  selector: 'app-invited-players',
  templateUrl: './invited-players.component.html',
  styleUrls: ['./invited-players.component.css']
})
export class InvitedPlayersComponent implements OnInit {

  data: any;

  playersWantingToJoin: any;

  constructor(@Inject(MAT_DIALOG_DATA) private givenData: any, private teamService: TeamService) {
    this.data = givenData;
  }

  ngOnInit(): void {
    this.teamService.getListofInvitedPlayers().subscribe(
      (res) => this.playersWantingToJoin = res
    )

  }

}
