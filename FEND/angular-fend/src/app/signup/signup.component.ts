import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Player } from '../teams/teams.interface';
import { SignUpDTO } from './DTO/signupDTO';
import { SignupService } from './signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {



  constructor(private signupService: SignupService) { }


  ngOnInit(): void {

  
    
  }

  onSubmit(f: NgForm){
    if(f.valid){
      if(f.value.password1 === f.value.password2){
      this.signupService.addPlayer(f.value);
      }

    }
  }
 
  

  
}
