import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faBan, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
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

  roles = [
    RoleEnum.Toplaner, 
    RoleEnum.Jungler, 
    RoleEnum.Midlaner, 
    RoleEnum.ADC, 
    RoleEnum.Support
  ];

  rankEnum = RankEnum;
  

  constructor(@Inject(MAT_DIALOG_DATA) private givenData: any, private teamService: TeamService) {
  this.data = givenData 
  }

  ngOnInit(): void {
  console.log(this.data.roles);
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

}
