import { Component, OnInit } from '@angular/core';
import { TournamentService } from './tournament.service';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})
export class TournamentComponent implements OnInit {

  tournament: any;
  matches = [];
  nbrOfRounds: number = 0;

  constructor(private tournamentService: TournamentService) { }

  ngOnInit(): void {
    this.tournamentService.testTournament().subscribe(
      res => {
        this.tournament = res;
        this.nbrOfRounds = Math.log2(this.tournament.seed);
        console.log(this.nbrOfRounds);
        for (let i = 0; i < this.tournament.matches; i ++) {
          console.log(this.tournament.matches[i].round);
          console.log(i+1)
          if(this.tournament.matches[i].round === (i + 1)){
            this.matches[i] = this.tournament.matches[i];
          }
        }
        console.log(this.matches);
        
      }
    )
    if(this.tournament){
      
    }
  }

  

}
