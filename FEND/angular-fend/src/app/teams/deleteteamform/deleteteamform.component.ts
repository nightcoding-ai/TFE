import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { JwtHelperService } from '@auth0/angular-jwt';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/auth/auth.service';
import { PLayerDTO } from 'src/app/profile-player/DTO/playerDTO';
import { ProfilePlayerService } from 'src/app/profile-player/profile-player.service';
import { TeamService } from '../team/team.service';

@Component({
  selector: 'app-deleteteamform',
  templateUrl: './deleteteamform.component.html',
  styleUrls: ['./deleteteamform.component.css']
})
export class DeleteteamformComponent implements OnInit {

  helper = new JwtHelperService();

  faXmark = faXmark;
  faCheck = faCheck;

  tokenDecoded : any;

  player: PLayerDTO;

  constructor(private dialogRef: MatDialogRef<DeleteteamformComponent>,  private authService: AuthenticationService, private profilePlayerService: ProfilePlayerService, private teamService : TeamService) { }

  ngOnInit(): void {

    let token = this.authService.getToken();

    if(token){
      this.getDecodedAccesToken(token);

      this.profilePlayerService.getUserInfos(this.tokenDecoded.id).subscribe(
        (res) => this.player = res
      )
    }
  }

  close(): void {
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

  onDeleteTeam(): any {
    this.close();
    return this.teamService.deleteTeam();
  }

}
