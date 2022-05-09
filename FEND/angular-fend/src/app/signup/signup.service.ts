import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SignUpDTO } from './DTO/signupDTO';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

    dto: SignUpDTO;

    readonly baseAPIUrl = "http://localhost:3000/api";


    constructor(
      private http: HttpClient, 
      private router: Router
    ) { }

    signUp(signUpDTO: SignUpDTO) {
      this.http.post<any>(`${this.baseAPIUrl}/players`, signUpDTO).subscribe(
        () => this.router.navigate(['/login'])
      )
    }

    uploadProfilePicture(file: any): Observable<any> {
      let formData = new FormData();
      formData.append('picture', file);
      return this.http.post<any>(`${this.baseAPIUrl}/players/upload`, formData);
    }
   


}
