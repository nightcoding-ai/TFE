import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateTeamDTO } from '../DTO/create-teamDTO';

@Injectable({
  providedIn: 'root'
})
export class CreateTeamFormService {

  readonly baseAPIUrl = "http://localhost:3000/api";


  constructor(private http: HttpClient) { }

  createTeam(teamDTO: CreateTeamDTO){
    this.http.post<any>(this.baseAPIUrl + "teams", teamDTO).subscribe(
      (res) => {
        console.log(res);
      }
    )
  }
}
