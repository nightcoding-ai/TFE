import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-banplayer',
  templateUrl: './banplayer.component.html',
  styleUrls: ['./banplayer.component.css']
})
export class BanplayerComponent implements OnInit {

  player: any;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private dialogRef: MatDialogRef<BanplayerComponent>) {

    this.player = data;
   }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close();
  }

}
