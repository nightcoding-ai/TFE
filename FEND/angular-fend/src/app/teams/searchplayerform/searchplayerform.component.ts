import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faFaceFrown, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { RankEnum } from 'src/app/ranks.enum';
import { RoleEnum } from 'src/app/roles.enum';
import { SearchplayerformService } from './searchplayerform.service';

@Component({
  selector: 'ndls-searchplayerform',
  templateUrl: './searchplayerform.component.html',
  styleUrls: ['./searchplayerform.component.css']
})
export class SearchplayerformComponent implements OnInit {

  data: any;
  freePlayers: any[] = [];
  faFaceFrown = faFaceFrown;
  faPlus = faPlus;
  faXmark = faXmark;
  faDiscord = faDiscord;
  clicked = false;
  roles = [
    RoleEnum.Toplaner, 
    RoleEnum.Jungler, 
    RoleEnum.Midlaner, 
    RoleEnum.ADC, 
    RoleEnum.Support
  ];
  rankEnum = RankEnum;

  constructor(
    @Inject(MAT_DIALOG_DATA) private givenData: any, 
    private searchPlayerService: SearchplayerformService, 
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.data = this.givenData;
    this.searchPlayerService.searchFreePlayersByRole(this.data.role).subscribe(
    res => {
      for (const p of res) {
        let freeP = {};
        freeP = p;
        freeP["invited"] = false;
        this.freePlayers.push(freeP);
      }
    })
  }

  onInvitePlayer(idPlayer: number, idTeam: number, role: RoleEnum): any{
    return this.searchPlayerService.invitePlayer(idPlayer, idTeam, role).subscribe((res) => console.log(res))
  }
}
