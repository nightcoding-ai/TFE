import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SignUpDTO } from './DTO/signupDTO';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

    dto: SignUpDTO;

    readonly baseAPIUrl = "http://localhost:3000/api";


    constructor(private http: HttpClient, private router: Router) { }

    signUp(signUpDTO: SignUpDTO){
      this.http.post<any>(this.baseAPIUrl + '/players', signUpDTO).subscribe(
        () => this.router.navigate(['/login'])
      )
    }

    getDiscordServer(){
      return this.http.get<any>("https://discord.com/api/guilds/950369524635553842/widget.json");
    }
   


}
