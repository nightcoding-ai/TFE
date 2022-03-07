import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginDTO } from './DTO/loginDTO';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  readonly baseAPIAuthURL = "http://localhost:3000/api/auth";


  constructor(private http: HttpClient) {
    
   }

  login(f: NgForm ){
    const dto: LoginDTO = f.value;

    console.log(f.value);
    return this.http.post<any>(this.baseAPIAuthURL + "/login",dto);
  }
}
