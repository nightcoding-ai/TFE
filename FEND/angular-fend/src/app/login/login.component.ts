import { Component, ErrorHandler, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../auth/auth.service';
import { NotificationsService } from '../temp/notifications.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  err: any;

  constructor(
    private authService: AuthenticationService,
    private router: Router, 
  ) { }

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
    this.authService.login(this.loginForm.value).subscribe(
          () => {
            this.router.navigate(['/teams']);
          }, error => 
          this.err = error
        )
  

    

  }
}

