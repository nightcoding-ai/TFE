import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/auth/auth.service';
import { ProfilePlayerService } from 'src/app/profile-player/profile-player.service';
import { Player } from '../../interfaces/player.interface';
import { Team } from '../../interfaces/team.interface';
import { TeamService } from '../team/team.service';
import { TeamsService } from '../teams.service';

@Component({
  selector: 'ndls-leaveteam',
  templateUrl: './leaveteam.component.html',
  styleUrls: ['./leaveteam.component.css']
})
export class LeaveteamComponent implements OnInit {

  helper = new JwtHelperService();
  faXmark = faXmark;
  faCheck = faCheck;
  tokenDecoded : any;
  user: Player;
  team: Team;
  setAsCaptain: FormGroup;
  playersWithoutCaptain : Player[];
  selectedPlayer: Player;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) private givenData: any,
    public authService: AuthenticationService,
    private teamService: TeamService,
    private dialogRef: MatDialogRef<LeaveteamComponent>
  ) { }

  ngOnInit(): void {
    this.user = this.givenData.player;
    this.team = this.givenData.team;
    this.getPlayersWithoutCaptain(this.team.players, this.user);
  }
  
  close(): void{
    this.dialogRef.close();
  }

  leaveTeam(): void{
    this.dialogRef.close();
    this.teamService.leaveTeam();
  }

  onSetNewCaptain(idPlayer: number):void {
    this.teamService.setAsCaptain(idPlayer).subscribe(
      () => this.leaveTeam()
    );
  }

  leaveTeamWithOnlyOneOtherPlayer(idPlayer :number): void {
    this.teamService.setAsCaptain(idPlayer).subscribe(
      () => this.leaveTeam()
    )
    this.close();
  }

  getSelectedPlayer(player: Player): Player {
    this.selectedPlayer = player;
    console.log(this.selectedPlayer);
    return this.selectedPlayer;
  }

  getPlayersWithoutCaptain(playersArray: Player[], user: Player): Player[] {
    this.playersWithoutCaptain = playersArray.filter(p => p.id !== user.id);
    return this.playersWithoutCaptain;
  }
}
