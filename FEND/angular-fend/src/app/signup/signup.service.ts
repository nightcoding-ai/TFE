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


      
    }

   


}
