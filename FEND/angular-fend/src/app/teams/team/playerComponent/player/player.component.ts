import { Component, Input, OnInit } from '@angular/core';
import { Player } from '../../../../interfaces/player.interface';
import { RankEnum } from '../../../../ranks.enum';
import { RoleEnum } from '../../../../roles.enum';

@Component({
  selector: 'ndls-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  @Input()
  player: Player;

  roleEnum = RoleEnum;
  rankEnum = RankEnum;

  constructor() { }

  ngOnInit(): void {
    console.log(this.player)
  }

}
