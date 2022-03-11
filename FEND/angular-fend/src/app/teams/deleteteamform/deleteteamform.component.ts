import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
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

  tokenDecoded : any;

  player: PLayerDTO;

  constructor(private authService: AuthenticationService, private profilePlayerService: ProfilePlayerService, private teamService : TeamService) { }

  ngOnInit(): void {

    let token = this.authService.getToken();

    if(token){
      this.getDecodedAccesToken(token);

      this.profilePlayerService.getUserInfos(this.tokenDecoded.id).subscribe(
        (res) => this.player = res
      )
    }
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
    return this.teamService.deleteTeam();
  }

}
