import { Component, Input, OnInit } from '@angular/core';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { Player } from '../interfaces/player.interface';
import { RankEnum } from '../ranks.enum';

@Component({
  selector: 'ndls-player-element',
  templateUrl: './player-list-element.component.html',
  styleUrls: ['./player-list-element.component.css']
})
export class PlayerListElementComponent implements OnInit {

  @Input()
  player: Player;
  @Input()
  first: any;

  rankEnum = RankEnum;
  faDiscord = faDiscord;

  constructor() { }

  ngOnInit(): void {
  }
}
