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
  final;
  constructor(private tournamentService: TournamentService) { }

  ngOnInit(): void {
    this.tournamentService.testTournament().subscribe(
      res => {
        this.tournament = res;
        this.getMatchesPerRound(this.tournament);
        console.log(this.matches)
        console.log(this.final);
      }
    )
    
  }

  getMatchesPerRound(tournament: any) {
    for(let i = 0; i < tournament.matches.length; i ++) {
      const rounds = tournament.matches.filter(m => m.round === i + 1);
      if(rounds.length > 0) {
        rounds.sort((a,b) => {
          if(a.id> b.id) return 1
          if(a.id  < b.id) return -1
          return 0
        }
        )
        this.matches.push(rounds);
        this.final = this.matches[this.matches.length -1];
      }
      
    }
  }

  

}
