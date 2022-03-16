import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faFaceFrown } from '@fortawesome/free-solid-svg-icons';
import { PLayerDTO } from 'src/app/profile-player/DTO/playerDTO';
import { SearchplayerformService } from './searchplayerform.service';

@Component({
  selector: 'app-searchplayerform',
  templateUrl: './searchplayerform.component.html',
  styleUrls: ['./searchplayerform.component.css']
})
export class SearchplayerformComponent implements OnInit {

  data : any;

  freePlayers: any;

  faFaceFrown = faFaceFrown;

  constructor(@Inject(MAT_DIALOG_DATA) private role: any, private searchPlayerService: SearchplayerformService) { }

  ngOnInit(): void {

    this.data = this.role;




    
    this.freePlayers = this.searchPlayerService.searchFreePlayersByRole(this.data).subscribe(
      (res) => {
            if(res){
            this.freePlayers = res
            }else
            return
            })
  }

}
