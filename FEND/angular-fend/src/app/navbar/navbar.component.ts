import { Component, OnInit } from '@angular/core';

import {MenubarModule} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from '../auth/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  faBars = faBars;

  helper = new JwtHelperService();

  tokenDecoded : any;

  
  constructor(public authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    let token = this.authService.getToken();
    this.getDecodedAccesToken(token);
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

 

  myTeamSelect(teamId: number){
    this.router.navigate(['/teams',teamId])
  }
  
}
