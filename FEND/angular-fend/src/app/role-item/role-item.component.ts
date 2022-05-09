import { Component, Input, OnInit } from '@angular/core';
import { faTriangleCircleSquare } from '@fortawesome/free-solid-svg-icons';
import { RoleEnum } from '../roles.enum';

@Component({
  selector: 'ndls-role-item',
  templateUrl: './role-item.component.html',
  styleUrls: ['./role-item.component.css']
})
export class RoleItemComponent implements OnInit {

  @Input()
  role: RoleEnum;

  roleEnum = RoleEnum;
  faTriangle = faTriangleCircleSquare;

  constructor() { }

  ngOnInit(): void {
  }

}
