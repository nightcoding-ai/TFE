import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faBan, faCircleCheck, faXmark, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { RankEnum } from 'src/app/ranks.enum';
import { RoleEnum } from 'src/app/roles.enum';
import { TeamService } from '../team/team.service';

@Component({
  selector: 'app-joinrequestlist',
  templateUrl: './joinrequestlist.component.html',
  styleUrls: ['./joinrequestlist.component.css']
})
export class JoinrequestlistComponent implements OnInit {

  data: any;

  faCircleCheck = faCircleCheck;
  faBan = faBan;
  faDiscord = faDiscord;
  faXmark = faXmark;

  roles = [
    RoleEnum.Toplaner, 
    RoleEnum.Jungler, 
    RoleEnum.Midlaner, 
    RoleEnum.ADC, 
    RoleEnum.Support
  ];

  rankEnum = RankEnum;
  

  constructor(@Inject(MAT_DIALOG_DATA) private givenData: any, private teamService: TeamService,private matRef: MatDialogRef<JoinrequestlistComponent>) {
  this.data = givenData 
  }

  ngOnInit(): void {
    console.log(this.data);
  }

  acceptRequest(idRequest: number){
    this.teamService.acceptJoinRequest(idRequest).subscribe(
      () => console.log("Join request correctly ACCEPTED.")
    )
  }

  declineRequest(idRequest: number){
    this.teamService.declineJoinRequest(idRequest).subscribe(
      () => console.log("Join request correctly refused.")
      )
  }

  close(){
    this.matRef.close();
  }

  checkRequests(reqs: any, role: RoleEnum){
    if(reqs){

      return reqs.find((r) => r.player.profile.role === role);
    }
    return;
  }

}
