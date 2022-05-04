import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faCrown, faGear, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Player } from '../../../../interfaces/player.interface';
import { Team } from '../../../../interfaces/team.interface';
import { RankEnum } from '../../../../ranks.enum';
import { RoleEnum } from '../../../../roles.enum';
import { BanplayerComponent } from '../../../banplayer/banplayer.component';
import { JoinTeamFormComponent } from '../../../join-team-form/join-team-form.component';
import { SearchplayerformComponent } from '../../../searchplayerform/searchplayerform.component';
import { SetascaptainComponent } from '../../../setascaptain/setascaptain.component';

@Component({
  selector: 'ndls-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  @Input()
  player: Player;
  @Input()
  role: RoleEnum;
  @Input()
  user: any;
  @Input()
  team: Team;

  roleEnum = RoleEnum;
  rankEnum = RankEnum;
  faDiscord = faDiscord;
  faGear = faGear;
  faCrown = faCrown;
  faMagnifyingGlass = faMagnifyingGlass;

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    console.log(this.player)
  }

  onOpenDialogDeletePlayer(idPlayer: any, playerName: any): void {
    this.dialog.open(BanplayerComponent, { data : {
      id: idPlayer,
      name: playerName
    }});
  }

  onOpenDialogSetAsCaptain(idPlayer: any, playerName: any): void {
    this.dialog.open(SetascaptainComponent, { data: {
      id: idPlayer,
      name: playerName
    }})
  }

  onOpenDialogJoinRequest(){
    this.dialog.open(JoinTeamFormComponent, { data : {
      team: this.team,
      user: this.user
    }});
  }

  onOpenDialogSearchPlayer(role: RoleEnum){
    this.dialog.open(SearchplayerformComponent, { data: {
      role: role,
      teamID: this.team.id
    }});
  }
}
