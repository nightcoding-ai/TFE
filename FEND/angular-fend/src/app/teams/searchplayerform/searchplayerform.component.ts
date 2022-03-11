import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-searchplayerform',
  templateUrl: './searchplayerform.component.html',
  styleUrls: ['./searchplayerform.component.css']
})
export class SearchplayerformComponent implements OnInit {

  data : any;

  constructor(@Inject(MAT_DIALOG_DATA) private role: any) { }

  ngOnInit(): void {

    this.data = this.role;
  }

}
