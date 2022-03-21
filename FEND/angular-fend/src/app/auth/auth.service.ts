import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import jwtDecode from "jwt-decode";
import { BehaviorSubject, map, tap } from "rxjs";
import { LoginDTO } from "../login/DTO/loginDTO";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    readonly baseAPIAuthURL = "http://localhost:3000/api/auth";

    readonly baseAPIURL = "http://localhost:3000/api";

    public _isLoggedIn$ = new BehaviorSubject<boolean>(false);
    isLoggedIn$ = this._isLoggedIn$.asObservable();

    constructor(private http: HttpClient, private router: Router) {}

    login(loginDTO: LoginDTO) {
        return this.http.post<any>("http://localhost:3000/api/auth/login", { name: loginDTO.name, password: loginDTO.password});
    }

    public getToken() {
        return localStorage.getItem('player-auth');
    }

    logout() {
        return localStorage.removeItem('player-auth');
    }

    loggedIn() {
        return !!localStorage.getItem('player-auth');
    }

    getProfile(){
        return this.http.get<any>("http://localhost:3000/api/profile");
    }

   
}