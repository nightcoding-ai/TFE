import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-my-team-profile',
  templateUrl: './my-team-profile.component.html',
  styleUrls: ['./my-team-profile.component.css']
})
export class MyTeamProfileComponent implements OnInit {


  helper = new JwtHelperService();

  tokenDecoded : any;

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  ngOnInit(): void {
    let token = this.authService.getToken();
    this.getDecodedAccesToken(token);
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
