import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faPenSquare, faXmark } from '@fortawesome/free-solid-svg-icons';
import { RankEnum } from 'src/app/ranks.enum';
import { RoleEnum } from 'src/app/roles.enum';
import { ProfilePlayerService } from '../profile-player.service';

@Component({
  selector: 'app-modify-profile',
  templateUrl: './modify-profile.component.html',
  styleUrls: ['./modify-profile.component.css']
})
export class ModifyProfileComponent implements OnInit {

  faPenSquare= faPenSquare;
  wrongRole: boolean = false;
  faXmark= faXmark;
  player: any;
  logoBase64: any;
  mates: any = [];
  ranks = [
    {name: RankEnum.NonClassé, abbrev: "Unranked"},
    {name: RankEnum.Fer, abbrev: "Fer"},
    {name: RankEnum.Bronze, abbrev: "Bronze"},
    {name: RankEnum.Argent, abbrev: "Argent"},
    {name: RankEnum.Or, abbrev: "Or"},
    {name: RankEnum.Platine, abbrev: "Plat"},
    {name: RankEnum.Diamant, abbrev: "Diam"},
    {name: RankEnum.Maitre, abbrev: "Master"},
    {name: RankEnum.GrandMaitre, abbrev: "GM"},
    {name: RankEnum.Challenger, abbrev: "Chall"},
  ];
  roles = [
    {name: RoleEnum.Toplaner, abbrev: "Top"},
    {name: RoleEnum.Jungler, abbrev: "Jun"},
    {name: RoleEnum.Midlaner, abbrev: "Mid"},
    {name: RoleEnum.ADC, abbrev: "ADC"},
    {name: RoleEnum.Support, abbrev: "Support"},
  ];

  updatePlayerForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    profilPicture: new FormControl(''),
    role: new FormControl(''),
    rank: new FormControl(''),
    inGameName: new  FormControl(''),
    discord: new FormControl('')
  });

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private dialogRef: MatDialogRef<ModifyProfileComponent>, private profileService: ProfilePlayerService) {
    this.player = data;
   }

  ngOnInit(): void {
    this.initializeForm();
    if(this.player.team) {
      for (const p of this.player.team.players) {
        if(p.profile.role !== this.player.profile.role){
          this.mates.push(p);
        }
      }
    }

  }

  close(){
    this.dialogRef.close();
  }

  onSubmit(){
    if(this.updatePlayerForm.invalid && this.verifyMates(this.updatePlayerForm.get('role').value)) {
      return alert("Bad form");
    }
    this.updatePlayerForm.patchValue({profilPicture : this.logoBase64});
    let newPlayerInfos = {};
    let newProfileInfos = {};
    newPlayerInfos["name"] = this.updatePlayerForm.get('name').value;
    newProfileInfos["email"] = this.updatePlayerForm.get('email').value;
    newProfileInfos["profilPicture"] = this.updatePlayerForm.get('profilPicture').value;
    newProfileInfos["role"] = this.updatePlayerForm.get('role').value;
    newProfileInfos["rank"] = this.updatePlayerForm.get('rank').value;
    newProfileInfos["inGameName"] = this.updatePlayerForm.get('inGameName').value;
    newProfileInfos["discord"] = this.updatePlayerForm.get('discord').value;

    
    this.profileService.updatePlayer(newPlayerInfos).subscribe(
      () => this.close()
    )
    this.profileService.updateProfile(newProfileInfos).subscribe(
      () => this.close()
    )
  }

  initializeForm() {
    this.updatePlayerForm.setValue({
        name: this.player.name,
        email: this.player.profile.email,
        profilPicture: '',
        role: this.player.profile.role,
        rank: this.player.profile.rank,
        inGameName: this.player.profile.inGameName,
        discord: this.player.profile.discord
    });
  }

  handleUpload(event: any){
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        this.logoBase64 = reader.result;    
    };
  }

  verifyMates(role: RoleEnum){
    if(this.mates.find(p => p.profile.role === role)){
      return true;
    }
    return false;
  }

}
