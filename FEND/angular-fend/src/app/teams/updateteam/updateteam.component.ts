import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { faPenSquare, faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/auth/auth.service';
import { ProfilePlayerService } from 'src/app/profile-player/profile-player.service';
import { Player } from '../../interfaces/player.interface';
import { Team } from '../../interfaces/team.interface';
import { SignupService } from '../../signup/signup.service';
import { UpdateTeamDTO } from '../DTO/update-teamDTO';
import { TeamService } from '../team/team.service';
import { TeamsService } from '../teams.service';

@Component({
  selector: 'ndls-update-team',
  templateUrl: './updateteam.component.html',
  styleUrls: ['./updateteam.component.css']
})
export class UpdateteamComponent implements OnInit {

  updateTeamForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    abbreviation: new FormControl(''),
    logo: new FormControl('')
  });
  playerTeam: Team;
  helper = new JwtHelperService();
  tokenDecoded : any;
  player: any;
  logoBase64: any;
  faXmark = faXmark;
  faPenSquare = faPenToSquare;
  newTeamLogo: any;

  constructor(
    private signupService: SignupService,
    private playerProfileService: ProfilePlayerService,
    private myTeamService: TeamService,
    private teamService: TeamsService,
    private authService: AuthenticationService,
    private profilePlayerService: ProfilePlayerService,
    private dialogRef: MatDialogRef<UpdateteamComponent>,
    private router: Router
  ) {}

  ngOnInit(): void {

    let token = this.authService.token;
    if(token){
      this.getDecodedAccesToken(token);
      this.profilePlayerService.getUserInfos(this.tokenDecoded.id).subscribe(
        (res) => {
          this.player = res; 
            if(this.player.teamId){
              this.teamService.getTeamByID(this.player.teamId).subscribe(res => {
                this.playerTeam = res
                this.initializeForm();
                });

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
        name: this.playerTeam.name,
        abbreviation: this.playerTeam.abbreviation,
        logo: ''
    });
  }

  handleUpload(event: any): void {
    this.newTeamLogo = event.target.files[0];
  }

  onSubmit(): void {
    console.log('submit');
    let teamDTO: UpdateTeamDTO = new UpdateTeamDTO();
    teamDTO.name = this.updateTeamForm.get('name').value;
    teamDTO.abbreviation = this.updateTeamForm.get('abbreviation').value;
    if(this.newTeamLogo) {
      let oldFileName = this.playerTeam.logo.split('/').pop();
      console.log(oldFileName);
      this.playerProfileService.deleteOldPlayerPp(oldFileName).subscribe(
        () => true
      );
      this.signupService.uploadProfilePicture(this.newTeamLogo).subscribe(
        res => {
          teamDTO.logo = res.filePath;
          this.myTeamService.updateTeam(teamDTO).subscribe(
            () => {
              this.close();
              this.reloadCurrentRoute();
            }
          )
        }
      );
    }
    this.myTeamService.updateTeam(teamDTO).subscribe(
      () => {
        this.close();
        this.reloadCurrentRoute();
      }
    );
    }

    reloadCurrentRoute() {
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentUrl]);
          console.log(currentUrl);
      });
    }
}
