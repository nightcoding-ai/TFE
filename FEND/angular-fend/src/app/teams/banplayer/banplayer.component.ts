import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TeamService } from '../team/team.service';

@Component({
  selector: 'app-banplayer',
  templateUrl: './banplayer.component.html',
  styleUrls: ['./banplayer.component.css']
})
export class BanplayerComponent implements OnInit {

  player: any;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private dialogRef: MatDialogRef<BanplayerComponent>, private teamService: TeamService) {

    this.player = data;
   }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close();
  }

  banPlayer(idPlayer: number){
    this.dialogRef.close();
    this.teamService.banPlayer(idPlayer).subscribe(
      () => console.log("Joueur exclu de l'équipe.")
    )
  }

}
