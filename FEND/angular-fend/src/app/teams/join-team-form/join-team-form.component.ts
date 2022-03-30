import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoleEnum } from 'src/app/roles.enum';
import { TeamService } from '../team/team.service';

@Component({
  selector: 'app-join-team-form',
  templateUrl: './join-team-form.component.html',
  styleUrls: ['./join-team-form.component.css']
})
export class JoinTeamFormComponent implements OnInit {

  data: any;

  constructor(@Inject(MAT_DIALOG_DATA) private givenData: any, private MaterialDialog: MatDialogRef<JoinTeamFormComponent>, private teamService: TeamService) { 
    this.data = givenData;
  }

  ngOnInit(): void {
  }

  joinTeamRequest(idPlayer: number, idTeam: number, role: RoleEnum){

    this.teamService.createJoinRequest(idPlayer, idTeam, role).subscribe(
      (res) => {
        console.log(res);
      }
    )
    this.MaterialDialog.close();
  }

  close(){
    this.MaterialDialog.close();
  }
}
