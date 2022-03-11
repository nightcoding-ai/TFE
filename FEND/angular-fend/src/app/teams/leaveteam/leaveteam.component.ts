import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationService } from 'src/app/auth/auth.service';
import { PLayerDTO } from 'src/app/profile-player/DTO/playerDTO';
import { ProfilePlayerService } from 'src/app/profile-player/profile-player.service';

@Component({
  selector: 'app-leaveteam',
  templateUrl: './leaveteam.component.html',
  styleUrls: ['./leaveteam.component.css']
})
export class LeaveteamComponent implements OnInit {

  helper = new JwtHelperService();

  tokenDecoded : any;

  user: PLayerDTO;

  setAsCaptain: FormGroup;

  
  constructor(public authService: AuthenticationService, private router: Router, private profilePlayerService: ProfilePlayerService) { }

  ngOnInit(): void {
    let token = this.authService.getToken();

    if(token){
      this.getDecodedAccesToken(token);

      this.profilePlayerService.getUserInfos(this.tokenDecoded.id).subscribe(
        (res) => this.user = res
      )
    }

    this.setAsCaptain = new FormGroup({
      newCaptain: new FormControl(null, [
        Validators.required
      ])
      
    })
  }
  
  
  getDecodedAccesToken(tokenToDecode: string): any {
    try {
      this.tokenDecoded = this.helper.decodeToken(tokenToDecode);
      return this.tokenDecoded;
      
    } catch(err) {
      return null;
    }

  }

 



  leaveTeam(){
    console.log("Envoie du formulaire")
  }

  onSubmit(){
    if(this.setAsCaptain.invalid){
      console.log("Mauvais form");
    }
    console.log(this.setAsCaptain.value);

  }


}
