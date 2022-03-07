import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  f: FormBuilder;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm){
    if(f.valid){
      this.loginService.login(f);

    }
    

  }

}
