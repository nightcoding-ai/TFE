import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../auth/auth.service';
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
  player: any;
  constructor(private tournamentService: TournamentService, private authService: AuthenticationService) {
   }

  ngOnInit(): void {
    this.player = this.authService.getPlayer(this.authService.id).subscribe(
      (res) => {
        console.log(res)
        this.player = res
        console.log(this.player)
      }
    )
    this.tournamentService.testTournament().subscribe(
      res => {
        this.tournament = res;
        this.getMatchesPerRound(this.tournament);
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
