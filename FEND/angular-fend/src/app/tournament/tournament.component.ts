import { Component, OnInit } from '@angular/core';
import { TournamentService } from './tournament.service';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})
export class TournamentComponent implements OnInit {

  matches: any;

  constructor(private tournamentService: TournamentService) { }

  ngOnInit(): void {
    this.tournamentService.testTournament().subscribe(
      res => {
        this.matches = res;
        console.log(this.matches);
      }
    )
  }

  

}
