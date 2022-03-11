import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/auth.service';
import { CreateTeamDTO } from '../DTO/create-teamDTO';

@Injectable({
  providedIn: 'root'
})
export class CreateTeamFormService {

  readonly baseAPIUrl = "http://localhost:3000/api";


  auth_token: any;

  constructor(private http: HttpClient, private authService: AuthenticationService, private router: Router) {

    this.auth_token = this.authService.getToken();
   }

  

  

  createTeam(teamDTO: CreateTeamDTO){
    this.http.post<any>(this.baseAPIUrl + "/teams", teamDTO, { headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${this.auth_token}`} }).subscribe(
      (res) => this.router.navigate(['/teams', res.team.id])
    )


      


    
  }
}
