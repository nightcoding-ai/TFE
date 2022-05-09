import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faBan, faCircleCheck, faXmark, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { RankEnum } from 'src/app/ranks.enum';
import { RoleEnum } from 'src/app/roles.enum';
import { Player } from '../../interfaces/player.interface';
import { JoinRequest } from '../../interfaces/request.interface';
import { TeamService } from '../team/team.service';

@Component({
  selector: 'app-joinrequestlist',
  templateUrl: './joinrequestlist.component.html',
  styleUrls: ['./joinrequestlist.component.css']
})
export class JoinrequestlistComponent implements OnInit {

  requests: JoinRequest[];
  requestsWithClick: any = [];
  player: Player;

  faCircleCheck = faCircleCheck;
  faBan = faBan;
  faDiscord = faDiscord;
  faXmark = faXmark;
  roleEnum = RoleEnum;

  rankEnum = RankEnum;
  

  constructor(
    @Inject(MAT_DIALOG_DATA) private givenData: any,
    private teamService: TeamService,
    private matRef: MatDialogRef<JoinrequestlistComponent>
    ) {
    this.requests = givenData.joinRequests;
    this.player = givenData.player;
  }

  ngOnInit(): void {
    for (const req of this.requests) {
      let r = {};
      r = req;
      r["clicked"] = false;
      this.requestsWithClick.push(r);
    }
  }

  acceptRequest(idRequest: number){
    console.log(idRequest);
    /*
    this.teamService.acceptJoinRequest(idRequest).subscribe(
      () => console.log("Join request correctly ACCEPTED.")
    )
    */
  }

  declineRequest(idRequest: number){
    this.teamService.declineJoinRequest(idRequest).subscribe(
      () => console.log("Join request correctly refused.")
      )
  }

  close(){
    this.matRef.close();
  }

  filterRequests(reqs: any, role: RoleEnum){
    if(reqs){

      return reqs.find((r) => r.player.profile.role === role);
    }
    return;
  }

}
