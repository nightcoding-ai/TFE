import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'ndls-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.css']
})
export class PlayerFormComponent implements OnInit {

  @Input()
  form: FormGroup;
  @Input()
  function: Function;

  constructor() { }

  ngOnInit(): void {
  }

}
