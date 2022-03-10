import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { AuthenticationService } from '../auth/auth.service';
import { JwtHelperService} from '@auth0/angular-jwt';

@Component({
  selector: 'app-profile-player',
  templateUrl: './profile-player.component.html',
  styleUrls: ['./profile-player.component.css']
})
export class ProfilePlayerComponent implements OnInit {

  message = '';

  helper = new JwtHelperService();

  tokenDecoded : any;

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  ngOnInit(): void {
    let token = this.authService.getToken();
    this.getDecodedAccesToken(token);
    console.log(this.tokenDecoded);
  }
  
  
  getDecodedAccesToken(tokenToDecode: string): any {
    try {
      this.tokenDecoded = this.helper.decodeToken(tokenToDecode);
      console.log("Fonction de décodage de Token :", this.tokenDecoded);
      return this.tokenDecoded;
      
    } catch(err) {
      return null;
    }
  }

}


