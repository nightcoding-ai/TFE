import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { Player } from '../teams/teams.interface';
import { SignUpDTO } from './DTO/signupDTO';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

    dto: SignUpDTO;

    readonly baseAPIUrl = "http://localhost:3000/api";

    lolplayer : any;

    constructor(private http: HttpClient) { }

    addPlayer(f: any){
      console.log(f);
      const disc: string = `${f.discordname}#${f.discordtag}`;
      
      this.dto.name = f.name;
      this.dto.profile = {
        "email": f.email,
        "password": f.password1,
        "profilPicture": f.profilPicture,
        "discord": disc,
        "inGameName": f.inGameName,
        "role": f.role,
        "rank": f.rank
      }
      this.http.post<any>(this.baseAPIUrl + "/players", this.dto).subscribe(
        (res) => {
          console.log(res);
        }
      )
    }

   


}
