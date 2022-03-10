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


    constructor(private http: HttpClient) { }



    addPlayer(f: any){


      const disc: string = `${f.discordname}#${f.discordtag}`;

      this.dto = new SignUpDTO;

      this.dto.name = f.username;


      this.dto.profile = {
        "email": f.email,
        "password": f.password1,
        "profilPicture": f.profilPicture || null,
        "discord": disc,
        "inGameName": f.inGameName,
        "role": f.roles,
        "rank": f.ranks
      }

      console.log(this.dto);



      this.http.post<any>(this.baseAPIUrl + "/players", this.dto).subscribe(
        (res) => {
          console.log(res);
        }
      )
    }

   


}
