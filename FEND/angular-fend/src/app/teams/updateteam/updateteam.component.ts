import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationService } from 'src/app/auth/auth.service';
import { PLayerDTO } from 'src/app/profile-player/DTO/playerDTO';
import { ProfilePlayerService } from 'src/app/profile-player/profile-player.service';
import { TeamDTO } from '../DTO/teamDTO';
import { UpdateTeamDTO } from '../DTO/update-teamDTO';
import { TeamService } from '../team/team.service';

@Component({
  selector: 'app-updateteam',
  templateUrl: './updateteam.component.html',
  styleUrls: ['./updateteam.component.css']
})
export class UpdateteamComponent implements OnInit {

  updateTeamForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    abbreviation: new FormControl(''),
    logo: new FormControl('')
  });


  helper = new JwtHelperService();

  tokenDecoded : any;

  player: PLayerDTO;

  team : UpdateTeamDTO;

  constructor(private teamService: TeamService,
    private authService: AuthenticationService,
    private profilePlayerService: ProfilePlayerService,
    private dialogRef: MatDialogRef<UpdateteamComponent>
  ) {}
  ngOnInit(): void {

    let token = this.authService.getToken();

    if(token){
      this.getDecodedAccesToken(token);

      this.profilePlayerService.getUserInfos(this.tokenDecoded.id).subscribe(
        (res) => {
          console.log("Informations du joueur reçues : ", res)
          this.player = res; 
            if(this.player.team){
              this.team = this.player.team;
              this.initializeForm();
            }  
        })
    }
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

  initializeForm() {
    this.updateTeamForm.setValue({
        name: this.team.name,
        abbreviation: this.team.abbreviation,
        logo: ''
    })
}


  onSubmit(){
    if(this.updateTeamForm.invalid) {
      return alert("Bad form");
    }
    this.close();
    return this.teamService.updateTeam(this.updateTeamForm.value);
  }

}
