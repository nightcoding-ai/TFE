import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-create-team-form',
  templateUrl: './create-team-form.component.html',
  styleUrls: ['./create-team-form.component.css']
})
export class CreateTeamFormComponent implements OnInit {

  
  teamForm: FormGroup;


  constructor(private authService: AuthenticationService,private router: Router) { }

  ngOnInit(): void {
    this.teamForm = new FormGroup({
      teamname: new FormControl(null, [
        Validators.required,
        Validators.maxLength(40)
      ]),
      abbreviation: new FormControl(null, [
        Validators.required,
        Validators.maxLength(3)
      ]),
      logo: new FormControl(null)
    })
  }

  onSubmit(){
    if(this.teamForm.invalid){
      console.log("Form is invalid.");
      return;
    }
    console.log(this.teamForm.value);

  }

}
