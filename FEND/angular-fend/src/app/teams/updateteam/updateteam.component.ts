import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-updateteam',
  templateUrl: './updateteam.component.html',
  styleUrls: ['./updateteam.component.css']
})
export class UpdateteamComponent implements OnInit {

  updateTeamForm: FormGroup;

  constructor() { }

  ngOnInit(): void {

    this.updateTeamForm = new FormGroup({
      name: new FormControl(null),
      abbreviation: new FormControl(null),
      logo: new FormControl(null)
    })
  }

  onSubmit(){
    console.log(this.updateTeamForm.value);
  }

}
