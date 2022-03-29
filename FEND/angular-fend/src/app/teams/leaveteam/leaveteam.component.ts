import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/auth/auth.service';
import { PLayerDTO } from 'src/app/profile-player/DTO/playerDTO';
import { ProfilePlayerService } from 'src/app/profile-player/profile-player.service';
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

  user: PLayerDTO;

  setAsCaptain: FormGroup;

  playersWithoutCaptain : any;

  
  constructor(public authService: AuthenticationService,
    private router: Router,
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
          console.log(this.playersWithoutCaptain);
          }
        }
      )
    }

    this.setAsCaptain = new FormGroup({
      newCaptain: new FormControl(null, [
        Validators.required
      ])
      
    })


    
  }
  
  close(){
    this.dialogRef.close();
    
  }
  
  getDecodedAccesToken(tokenToDecode: string): any {
    try {
      this.tokenDecoded = this.helper.decodeToken(tokenToDecode);
      return this.tokenDecoded;
      
    } catch(err) {
      return null;
    }

  }

 



  leaveTeam(){
    this.teamService.leaveTeam();
    
  }


  onSubmit(){
    console.log("Submission")
    if(this.setAsCaptain.invalid){
      console.log("invalid form");
    }
    console.log("valeur du form", this.setAsCaptain.value.newCaptain);
    if(this.user.profile.isCaptain === true){
      console.log("Le capitaine va être nommé");
      this.teamService.setAsCaptain(this.setAsCaptain.value.newCaptain).subscribe(
      
      () =>  {
        console.log('Joueur a été nommé capitaine, réponse du service.')
        this.teamService.leaveTeam();
      }
      )
    }
    this.close();

  }

  leaveTeamWithOnlyOneOtherPlayer(idPlayer :number){
    console.log(idPlayer);
    console.log(this.user.id);

    console.log(this.user.profile.isCaptain)
    this.teamService.setAsCaptain(idPlayer).subscribe(
      () => this.leaveTeam()
    )
    
    this.close();
  }


}
