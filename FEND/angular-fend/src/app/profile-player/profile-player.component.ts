import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { AuthenticationService } from '../auth/auth.service';
import { JwtHelperService} from '@auth0/angular-jwt';
import { ProfilePlayerService } from './profile-player.service';
import { Player } from '../teams/teams.interface';
import { PLayerDTO } from './DTO/playerDTO';

@Component({
  selector: 'app-profile-player',
  templateUrl: './profile-player.component.html',
  styleUrls: ['./profile-player.component.css']
})
export class ProfilePlayerComponent implements OnInit {


  helper = new JwtHelperService();

  tokenDecoded : any;

  player: PLayerDTO;

  constructor(private http: HttpClient, private authService: AuthenticationService, private profilePlayerService: ProfilePlayerService) { }

  ngOnInit(): void {
    let token = this.authService.getToken();
    this.getDecodedAccesToken(token);
    this.profilePlayerService.getUserInfos(this.tokenDecoded.id).subscribe(
      (res) => {
        this.player = res;
        console.log(this.player);
      }
    )
  }
  
  
  getDecodedAccesToken(tokenToDecode: string): any {
    try {
      this.tokenDecoded = this.helper.decodeToken(tokenToDecode);
      return this.tokenDecoded;
      
    } catch(err) {
      return null;
    }
  }

}


