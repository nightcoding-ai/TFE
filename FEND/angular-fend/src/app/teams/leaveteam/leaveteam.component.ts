import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/auth/auth.service';
import { ProfilePlayerService } from 'src/app/profile-player/profile-player.service';
import { Player } from '../../interfaces/player.interface';
import { TeamService } from '../team/team.service';

@Component({
  selector: 'app-leaveteam',
  templateUrl: './leaveteam.component.html',
  styleUrls: ['./leaveteam.component.css']
})
export class LeaveteamComponent implements OnInit {

  helper = new JwtHelperService();
  faXmark = faXmark;
  faCheck = faCheck;
  tokenDecoded : any;
  user: Player;
  setAsCaptain: FormGroup;
  playersWithoutCaptain : any;
  
  constructor(
    public authService: AuthenticationService,
    private profilePlayerService: ProfilePlayerService,
    private teamService: TeamService,
    private dialogRef: MatDialogRef<LeaveteamComponent>
  ) { }

  ngOnInit(): void {
    let token = this.authService.getToken();

    if(token){
      this.getDecodedAccesToken(token);

      this.profilePlayerService.getUserInfos(this.tokenDecoded.id).subscribe(
        (res) => {
          this.user = res
          if(this.user.team.players){
          this.playersWithoutCaptain = this.user.team.players.filter(player => player.profile.isCaptain === false)
          }
        }
      )
    }
    this.setAsCaptain = new FormGroup({
      newCaptain: new FormControl(null, [
        Validators.required
      ]) 
    });
  }
  
  close(): void{
    this.dialogRef.close();
  }
  
  getDecodedAccesToken(tokenToDecode: string): any {
    try {
      this.tokenDecoded = this.helper.decodeToken(tokenToDecode);
      return this.tokenDecoded;
      
    } 
    catch(err) {
      return null;
    }
  }

  leaveTeam(): void{
    this.dialogRef.close();
    this.teamService.leaveTeam();
  }


  onSubmit(): void{
    if(this.setAsCaptain.invalid){
      console.log("invalid form");
    }
    if(this.user.profile.isCaptain === true){
      this.teamService.setAsCaptain(this.setAsCaptain.value.newCaptain).subscribe(
        () =>  {
        this.teamService.leaveTeam();
      }
      )
    }
    this.close();
  }

  leaveTeamWithOnlyOneOtherPlayer(idPlayer :number): void {
    this.teamService.setAsCaptain(idPlayer).subscribe(
      () => this.leaveTeam()
    )
    this.close();
  }
}
