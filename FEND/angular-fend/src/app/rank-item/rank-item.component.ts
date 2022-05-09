import { Component, Input, OnInit } from '@angular/core';
import { RankEnum } from '../ranks.enum';

@Component({
  selector: 'ndls-rank-item',
  templateUrl: './rank-item.component.html',
  styleUrls: ['./rank-item.component.css']
})
export class RankItemComponent implements OnInit {

  @Input()
  rank: RankEnum;

  rankEnum = RankEnum;
  
  constructor() { }

  ngOnInit(): void {
  }

}
