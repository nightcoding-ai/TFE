import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginDTO } from './DTO/loginDTO';

@Injectable({
  providedIn: 'root'
})
export class LoginService {




  constructor(private http: HttpClient) {
    
   }
  }
