import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { AuthenticationService } from '../auth/auth.service';
import { LoginService } from './login.service';
import jwtDecode from 'jwt-decode';
import { NotificationsService } from '../temp/notifications.service';
import { Player, Team } from '../teams/teams.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  user : any;

  constructor(private authService: AuthenticationService,private router: Router, private notificationService: NotificationsService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(4)
      ])
    })
  }

  onSubmit(){
    if(this.loginForm.invalid){
      console.log("Form is invalid.");
      return;
    }
    this.authService.login(this.loginForm.value).pipe(
        switchMap(
          (res) => {
            console.log("switchmap (login component)",res);
            localStorage.setItem('player-auth', res.acces_token);
            this.authService._isLoggedIn$.next(true);
            return this.notificationService.getNotifications();
        }))
        .subscribe(
          (res) => {
            console.log("Réponse du subscribe", res);
            this.notificationService.notifications$.next(res);

            
          }
        )
  

    

  }
}

