import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfilePlayerService } from 'src/app/profile-player/profile-player.service';
import { SignupService } from '../../signup/signup.service';
import { CreateTeamDTO } from '../DTO/create-teamDTO';
import { CreateTeamFormService } from './create-team-form.service';

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
  });
  teamPp:any;

  constructor(
    private createTeamService: CreateTeamFormService, 
    private signUpService: SignupService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.teamForm.setValue({
        name: null,
        abbreviation: null,
        logo: ''
    })
  }

  onSubmit(): void | null{
    if(this.teamForm.invalid){
      console.log("Form is invalid.");
      return null;
    }
    let dto: CreateTeamDTO = new CreateTeamDTO();
    dto.name = this.teamForm.get('name').value;
    dto.abbreviation = this.teamForm.get('abbreviation').value;
    if(this.teamPp) {
      this.signUpService.uploadProfilePicture(this.teamPp).subscribe(
        res => {
          dto.logo = res.filePath;
          this.createTeamService.createTeam(dto);
        }
      )
    }
    if(!this.teamForm.get('logo').value) {
      this.createTeamService.createTeam(dto); 
    }
  };

  handleUpload(event: any): void {
    this.teamPp = event.target.files[0];
  }
}
