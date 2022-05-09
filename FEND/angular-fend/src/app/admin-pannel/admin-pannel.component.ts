import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { forkJoin, Observable } from 'rxjs';
import { AdminPannelService } from './admin-pannel.service';

@Component({
  selector: 'app-admin-pannel',
  templateUrl: './admin-pannel.component.html',
  styleUrls: ['./admin-pannel.component.css']
})
export class AdminPannelComponent implements OnInit {

  allPlayersList: any;
  allTeamsList: any;
  dataSourceArray= new MatTableDataSource();
  dataSourceArrayTeam= new MatTableDataSource();

  columnsToDisplay : any[] = ['id', 'name', 'inGameName', 'role', 'rank', 'team'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private adminService: AdminPannelService) { }

  ngOnInit(): void {
    forkJoin([
      this.getAllPlayersList(),
      this.getAllFreePlayers(),
      this.getAllTeamsList(),
    ]).subscribe( res => {
      this.allPlayersList = res[0];
      if(this.allPlayersList){
        this.getDataSource(this.allPlayersList);
        this.dataSourceArray.sort = this.sort;
        this.dataSourceArray.paginator = this.paginator;
      }
      this.allTeamsList = res[2];
      if(this.allTeamsList){
        this.getDataSourceTeam(this.allTeamsList);
      }
    })
   
    
  }

  getAllPlayersList(): Observable<any> {
    return this.adminService.getPlayersList();
  }

  getAllTeamsList(): Observable<any> {
    return this.adminService.getAllTeamsList();
  }

  getAllFreePlayers(): Observable<any> {
    return this.adminService.getFreePlayers();
  }

  getDataSource(tab: Array<any>): void {
    let newTab = [];
    for (const arr of tab) {
      let player = {};
      player["id"] = arr.id;
      player["name"] = arr.name;
      player["inGameName"] = arr.ign;
      player["role"] = arr.role;
      player["rank"] = arr.rank;
      if(arr.teamName){
        player["team"] = arr.teamName;
      }
      else{
        player["team"] = "Aucune Equipe";
      }
      newTab.push(player)
    }
    this.dataSourceArray.data = newTab;
  }

  getDataSourceTeam(tab: Array<any>): void {
    let newTab = [];
    for (const arr of tab) {
      let team = {};
      team["id"] = arr.id;
      team["name"] = arr.name;
      team["abbreviation"] = arr.abbreviation;
      newTab.push(team);
    }
    this.dataSourceArrayTeam.data = newTab;
  }

  applyFilter(e : Event) {
    let value1 = (e.target as HTMLInputElement).value;
    this.dataSourceArray.filter = value1.trim().toLowerCase();
  }
  applyFilterTeam(e : Event) {
    let value1 = (e.target as HTMLInputElement).value;
    this.dataSourceArrayTeam.filter = value1.trim().toLowerCase();
  }
}
