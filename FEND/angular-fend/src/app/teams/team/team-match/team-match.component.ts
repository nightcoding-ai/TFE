import { Component, Input, OnInit } from '@angular/core';
import { MatCardHeader } from '@angular/material/card';
import { Match } from '../../../interfaces/match.interface';

@Component({
  selector: 'ndls-match',
  templateUrl: './team-match.component.html',
  styleUrls: ['./team-match.component.css']
})
export class TeamMatchComponent implements OnInit {

  @Input()
  match: Match;

  constructor() { }

  ngOnInit(): void {
  }


}
