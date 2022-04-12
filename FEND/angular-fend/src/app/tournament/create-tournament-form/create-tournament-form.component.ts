import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-tournament-form',
  templateUrl: './create-tournament-form.component.html',
  styleUrls: ['./create-tournament-form.component.css']
})
export class CreateTournamentFormComponent implements OnInit {

  readonly date = new Date();
  tournamentForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
    ]),
    seed: new FormControl(4, [
      Validators.required
    ]),
    startDate: new FormControl(this.date, [
      Validators.required
    ]),
    endDate: new FormControl(new Date(this.date.setDate(this.date.getDate() + 7)), [
      Validators.required
    ])
  })
  constructor() { }

  ngOnInit(): void { }
}
