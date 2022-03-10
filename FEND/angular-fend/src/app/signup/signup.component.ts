import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, RangeValueAccessor, Validators } from '@angular/forms';
import { RankEnum } from '../ranks.enum';
import { RoleEnum } from '../roles.enum';
import { Player } from '../teams/teams.interface';
import { SignUpDTO } from './DTO/signupDTO';
import { SignupService } from './signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  myForm: FormGroup;

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



  constructor(private signupService: SignupService, private fb: FormBuilder) { }


  ngOnInit(): void {
    this.myForm = this.fb.group({
      
    })
  
    
  }

  onSubmit(f: NgForm){
    if(f.valid){
      if(f.value.password1 === f.value.password2){
      this.signupService.addPlayer(f.value);
      }

    }
  }
 
  

  
}
