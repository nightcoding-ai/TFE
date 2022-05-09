import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../auth/auth.service';
import { JwtHelperService} from '@auth0/angular-jwt';
import { ProfilePlayerService } from './profile-player.service';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { RoleEnum } from '../roles.enum';
import { RankEnum } from '../ranks.enum';
import { faAt, faPenToSquare, faTriangleExclamation, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { ModifyProfileComponent } from './modify-profile/modify-profile.component';

@Component({
  selector: 'app-profile-player',
  templateUrl: './profile-player.component.html',
  styleUrls: ['./profile-player.component.css']
})
export class ProfilePlayerComponent implements OnInit {

  helper = new JwtHelperService();
  tokenDecoded : any;
  faDiscord= faDiscord;
  player: any;
  tournamentsWon: number = 0;
  faTriangle = faTriangleExclamation;
  roles = [
    RoleEnum.Toplaner, 
    RoleEnum.Jungler, 
    RoleEnum.Midlaner, 
    RoleEnum.ADC, 
    RoleEnum.Support
  ];
  rankEnum = RankEnum;
  idTeam: number;
  roleEnum = RoleEnum;
  faAt = faAt;
  faPenToSquare = faPenToSquare;
  faTrophy = faTrophy;

  constructor(
    private authService: AuthenticationService,
    private profilePlayerService: ProfilePlayerService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    let token = this.authService.getToken();
    this.getDecodedAccesToken(token);
    this.profilePlayerService.getPlayerProfile().subscribe(
      (res) => {
        this.player = res;
        console.log(this.player.profilPicture)

        if(this.player.teamId) {
          this.profilePlayerService.getTournamentsWon(this.player.teamId).subscribe(
            res => this.tournamentsWon = res
          )
        }

      }
    )
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

  onChangeProfile(): void {
    this.dialog.open(ModifyProfileComponent, { data: this.player});
  }

}


