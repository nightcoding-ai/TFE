import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import jwtDecode from "jwt-decode";
import { BehaviorSubject, map, tap } from "rxjs";
import { LoginDTO } from "../login/DTO/loginDTO";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    readonly baseAPIAuthURL = "http://localhost:3000/api/auth";

    readonly baseAPIURL = "http://localhost:3000/api";

    public _isLoggedIn$ = new BehaviorSubject<boolean>(!!localStorage.getItem('player-auth'));
    isLoggedIn$ = this._isLoggedIn$.asObservable();

    constructor(private http: HttpClient, private router: Router) {}

    login(loginDTO: LoginDTO) {
        return this.http.post<any>("http://localhost:3000/api/auth/login", { name: loginDTO.name, password: loginDTO.password}).pipe(
            tap((res) => {
                localStorage.setItem('player-auth', res.acces_token);
                this._isLoggedIn$.next(true);
            })
        );
    }

    private _token: string;
    private _user: any;
    private _player: any;

    get token() {
        if (!this._token) {
            this._token = localStorage.getItem('player-auth');

            if (!this._token){
                this.logout();
                return null;
            }
        }

        return this._token;
    }

    get user() {
        if (!this._user){
            if (!this.token) {
                return null;
            }
        this._user = (new JwtHelperService()).decodeToken(this.token);
        }
        return this._user;
    }

    

    get id() {
        return this.user?.id;
    }

    public getToken() {
        return localStorage.getItem('player-auth');
    }

    logout(): void {
        this._token = null;
        this._user = null;

        localStorage.removeItem('player-auth');
        this._isLoggedIn$.next(false);
    }

    loggedIn() {
        return !!localStorage.getItem('player-auth');
    }

    getPlayer(idPlayer: number){
        return  this.http.get<any>(`http://localhost:3000/api/players/single/${idPlayer}`);
    }

   
}