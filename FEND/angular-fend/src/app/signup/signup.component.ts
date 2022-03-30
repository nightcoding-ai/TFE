import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, RangeValueAccessor, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { RankEnum } from '../ranks.enum';
import { RoleEnum } from '../roles.enum';
import { Player } from '../teams/teams.interface';
import { SignUpDTO } from './DTO/signupDTO';
import { MyErrorStateMatcher } from './myErrorStateMatcher';
import { SignupService } from './signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;

  signUpDTO: SignUpDTO;


  ranks = [
    {name: RankEnum.NonClassé, abbrev: "Unranked"},
    {name: RankEnum.Fer, abbrev: "Fer"},
    {name: RankEnum.Bronze, abbrev: "Bronze"},
    {name: RankEnum.Argent, abbrev: "Argent"},
    {name: RankEnum.Or, abbrev: "Or"},
    {name: RankEnum.Platine, abbrev: "Plat"},
    {name: RankEnum.Diamant, abbrev: "Diam"},
    {name: RankEnum.Maitre, abbrev: "Master"},
    {name: RankEnum.GrandMaitre, abbrev: "GM"},
    {name: RankEnum.Challenger, abbrev: "Chall"},
  ]

  roles = [
    {name: RoleEnum.Toplaner, abbrev: "Top"},
    {name: RoleEnum.Jungler, abbrev: "Jun"},
    {name: RoleEnum.Midlaner, abbrev: "Mid"},
    {name: RoleEnum.ADC, abbrev: "ADC"},
    {name: RoleEnum.Support, abbrev: "Support"},
  ]

  logoBase64: any;

  matcher = new MyErrorStateMatcher();




  constructor(private signupService: SignupService) { }


  ngOnInit(): void {

    this.signUpForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.maxLength(40),
        Validators.minLength(4)
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password1: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
      password2: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),

      ]),
      profilPicture: new FormControl(null),

      discord: new FormControl(null,[ 
        Validators.required,
      ]),
      
      inGameName: new FormControl(null, 
        Validators.required
      ),
      rank: new FormControl(RankEnum.NonClassé,
        Validators.required
      ),
      role: new FormControl(RoleEnum.Toplaner, 
        Validators.required
      )
    }, { validators: [this.checkPasswords,
                      this.checkDiscord],
                      })
    
  
    
  }

  get passwordOne() {  return this.signUpForm.get('password1');}

  get passwordTwo() {  return this.signUpForm.get('password2');}

  get discord() { return this.signUpForm.get('discord')};

  handleUpload(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        this.logoBase64 = reader.result;
        
    };
  }

  onSubmit(){
      if(this.signUpForm.valid){
        this.signUpDTO = new SignUpDTO();
        this.signUpForm.patchValue({profilPicture : this.logoBase64});
        console.log(this.signUpForm.get('name').value);
        console.log(this)
        this.signUpDTO.name = this.signUpForm.get('name').value;
        this.signUpDTO.profile = {
          email: this.signUpForm.get('email').value,
          password: this.signUpForm.get('password1').value,
          discord: this.signUpForm.get('discord').value,
          inGameName: this.signUpForm.get('inGameName').value,
          role: this.signUpForm.get('role').value,
          rank: this.signUpForm.get('rank').value,
          profilPicture: this.logoBase64
        }
        this.signupService.signUp(this.signUpDTO); 
      }
      return;
  }

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let pass = group.get('password1').value;
    let confirmPass = group.get('password2').value
    return pass === confirmPass ? null : { notSame: true }
  }

  checkDiscord: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let disc = group.get('discord').value;
    return (disc !== null && disc[disc.length-5] === '#' && (typeof(Number(disc.slice(-4))) === 'number')) ? null : { notDiscord: true }
  }
 
  

  
}


// <!--(disc[disc.length-5] === '#' && (typeof(Number(disc.slice(-4))) === 'number')) ? {discord: {value: control.value}} : null;-->
