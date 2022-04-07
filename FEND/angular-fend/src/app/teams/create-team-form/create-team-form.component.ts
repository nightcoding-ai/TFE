import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationService } from 'src/app/auth/auth.service';
import { PLayerDTO } from 'src/app/profile-player/DTO/playerDTO';
import { ProfilePlayerService } from 'src/app/profile-player/profile-player.service';
import { CreateTeamFormService } from './create-team-form.service';
import { MatFormField } from '@angular/material/form-field';

@Component({
  selector: 'app-create-team-form',
  templateUrl: './create-team-form.component.html',
  styleUrls: ['./create-team-form.component.css']
})
export class CreateTeamFormComponent implements OnInit {

  

  logoBase64: any;

  teamForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.maxLength(40),
      Validators.minLength(5)
    ]),
    abbreviation: new FormControl('', [
      Validators.required,
      Validators.maxLength(3)
    ]),
    logo: new FormControl('')
  })


  

  constructor(private createTeamService: CreateTeamFormService, private playerService: ProfilePlayerService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.teamForm.setValue({
        name: null,
        abbreviation: null,
        logo: ''
    })
  }

  onSubmit(){
    if(this.teamForm.invalid){
      console.log("Form is invalid.");
      return;
    }
    this.teamForm.patchValue({logo : this.logoBase64});
    this.createTeamService.createTeam(this.teamForm.value);

  };

  handleUpload(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        this.logoBase64 = reader.result;
        
    };
  }

 

}
