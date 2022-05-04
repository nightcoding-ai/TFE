import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { JwtHelperService } from '@auth0/angular-jwt';
import { faPenSquare, faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/auth/auth.service';
import { ProfilePlayerService } from 'src/app/profile-player/profile-player.service';
import { Player } from '../../interfaces/player.interface';
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
    abbreviation: new FormControl('', Validators.maxLength(3)),
    logo: new FormControl('')
  });
  helper = new JwtHelperService();
  tokenDecoded : any;
  player: any;
  team : UpdateTeamDTO;
  logoBase64: any;
  faXmark = faXmark;
  faPenSquare = faPenToSquare;

  constructor(private teamService: TeamService,
    private authService: AuthenticationService,
    private profilePlayerService: ProfilePlayerService,
    private dialogRef: MatDialogRef<UpdateteamComponent>
  ) {}

  ngOnInit(): void {

    let token = this.authService.token;
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

  close(): void {
    this.dialogRef.close();
  }

  getDecodedAccesToken(tokenToDecode: string): any | null {
    try {
      this.tokenDecoded = this.helper.decodeToken(tokenToDecode);
      return this.tokenDecoded;
    }
    catch(err) {
      return null;
    }

  }

  initializeForm(): void {
    this.updateTeamForm.setValue({
        name: this.team.name,
        abbreviation: this.team.abbreviation,
        logo: ''
    });
  }

  handleUpload(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        this.logoBase64 = reader.result;
    };
  }

  onSubmit(): void {

    /*
    if(this.updatePlayerForm.invalid && this.verifyMates(this.updatePlayerForm.get('role').value)) {
      return alert("Bad form");
    }
    let playerDTO: UpdatePlayerDTO = new UpdatePlayerDTO();
    playerDTO.name = this.updatePlayerForm.get('name').value;
    let profileDTO: UpdatePlayerProfileDTO = new UpdatePlayerProfileDTO();
    profileDTO.email = this.updatePlayerForm.get('email').value;
    profileDTO.discord = this.updatePlayerForm.get('discord').value;
    profileDTO.role = this.updatePlayerForm.get('role').value;
    profileDTO.rank = this.updatePlayerForm.get('rank').value;
    if(this.newPp) {
      let oldFileName = this.player.profilPicture.split('/').pop();
      console.log(oldFileName)
      this.playerProfileService.deleteOldPlayerPp(oldFileName).subscribe(
        () => true
      )
      this.signupService.uploadProfilePicture(this.newPp).subscribe(
        res => {
          profileDTO.profilPicture = res.filePath;
          this.playerProfileService.updatePlayer(this.player.id,playerDTO);
          this.playerProfileService.updatePlayerProfile(this.player.id, profileDTO).subscribe(
            () => this.close()
          )}
      )
    }
    this.playerProfileService.updatePlayer(this.player.id,playerDTO);
    this.playerProfileService.updatePlayerProfile(this.player.id, profileDTO).subscribe(
      () => this.close()
  */
    
  }
}
