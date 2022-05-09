import { Component, OnInit } from '@angular/core';
import { TypePredicateKind } from 'typescript';
import { AuthenticationService } from '../auth/auth.service';
import { Tournament } from '../interfaces/tournament.interface';
import { TournamentService } from './tournament.service';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})
export class TournamentComponent implements OnInit {

  player: any;
  tournamentList = [];
  responseOfService: boolean = false;

  constructor(private tournamentService: TournamentService, private authService: AuthenticationService) {
   }

  ngOnInit(): void {
    this.player = this.authService.getPlayer(this.authService.id).subscribe(
      (res) => {
        this.player = res
      }
    )
    this.tournamentService.getListOfTournaments().subscribe(
      res => {
        this.responseOfService = !this.responseOfService;
        for (const t of res) {
          console.log(t)
          let tournament = new Object();
          tournament["id"] = t.id;
          tournament["name"] = t.name;
          tournament["areInscriptionsClosed"] = t.areInscriptionsClosed;
          tournament["startDate"] = t.startDate;
          tournament["endDate"] = t.endDate;
          tournament["seed"] = t.seed;
          tournament["matches"] = this.getMatchesPerRound(t);
          this.tournamentList.push(tournament);
        } 
        return this.tournamentList;
      }
    )

  }

  getMatchesPerRound(tournament: any) {
    let matches = [];
    for(let i = 0; i < tournament.matches.length; i ++) {
      const rounds = tournament.matches.filter(m => m.round === i + 1);
      if(rounds.length > 0) {
        rounds.sort((a,b) => {
          if(a.id > b.id) return 1
          if(a.id < b.id) return -1
          return 0
        }
        )
        matches.push(rounds);
      } 
    }
    return matches;
  }

  showTournamentDetails(idTournament: number) {
    
  }
  

}
