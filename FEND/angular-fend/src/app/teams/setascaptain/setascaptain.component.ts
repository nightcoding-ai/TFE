import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TeamService } from '../team/team.service';

@Component({
  selector: 'app-setascaptain',
  templateUrl: './setascaptain.component.html',
  styleUrls: ['./setascaptain.component.css']
})
export class SetascaptainComponent implements OnInit {

  data: any;

  constructor(@Inject(MAT_DIALOG_DATA) private givenData: any, private teamService: TeamService, private MatDialog: MatDialogRef<SetascaptainComponent>) {
    this.data = givenData;
   }

  ngOnInit(): void {
  }

  setAsCaptain(idPlayer: number){
    this.teamService.setAsCaptain(idPlayer).subscribe(() => this.MatDialog.close())

  }

  close(){
    this.MatDialog.close();
  }

}
