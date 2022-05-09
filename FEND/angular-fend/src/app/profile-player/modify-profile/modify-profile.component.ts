import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faPenSquare, faXmark } from '@fortawesome/free-solid-svg-icons';
import { RankEnum } from 'src/app/ranks.enum';
import { RoleEnum } from 'src/app/roles.enum';
import { SignupService } from '../../signup/signup.service';
import { UpdatePlayerDTO } from '../DTO/updatePlayerDTO';
import { UpdatePlayerProfileDTO } from '../DTO/updatePlayerProfileDTO';
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
  newPp: any;
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
  roleEnum = RoleEnum;

  updatePlayerForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    profilPicture: new FormControl(''),
    role: new FormControl(''),
    rank: new FormControl(''),
    inGameName: new  FormControl(''),
    discord: new FormControl('')
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any, 
    private dialogRef: MatDialogRef<ModifyProfileComponent>, 
    private signupService: SignupService,
    private playerProfileService: ProfilePlayerService) {
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
    let playerDTO: UpdatePlayerDTO = new UpdatePlayerDTO();
    playerDTO.name = this.updatePlayerForm.get('name').value;
    let profileDTO: UpdatePlayerProfileDTO = new UpdatePlayerProfileDTO();
    profileDTO.email = this.updatePlayerForm.get('email').value;
    profileDTO.discord = this.updatePlayerForm.get('discord').value;
    profileDTO.role = this.updatePlayerForm.get('role').value;
    profileDTO.rank = this.updatePlayerForm.get('rank').value;
    if(this.newPp) {
      let oldFileName = this.player.profilPicture.split('/').pop();
      this.playerProfileService.deleteOldPlayerPp(oldFileName).subscribe(
        () => true
      )
      this.signupService.uploadProfilePicture(this.newPp).subscribe(
        res => {
          profileDTO.profilPicture = res.filePath;
          this.playerProfileService.updatePlayer(this.player.id,playerDTO);
          this.playerProfileService.updatePlayerProfile(this.player.id, profileDTO).subscribe(
            () => this.close()
          )}
      )
    }
    this.playerProfileService.updatePlayer(this.player.id,playerDTO);
    this.playerProfileService.updatePlayerProfile(this.player.id, profileDTO).subscribe(
      () => this.close()
    )
  }

  setNewRole(role: RoleEnum) {
    this.updatePlayerForm.patchValue({ role: role});
    console.log(this.updatePlayerForm.get('role').value);
  }

  setNewRank(rank: RankEnum) {
    this.updatePlayerForm.patchValue({ rank: rank});
    console.log(this.updatePlayerForm.get('rank').value);
  }

  initializeForm() {
    this.updatePlayerForm.setValue({
        name: this.player.name,
        email: this.player.mail,
        profilPicture: this.player.profilPicture,
        role: this.player.role,
        rank: this.player.rank,
        inGameName: this.player.ign,
        discord: this.player.discord
    });
  }

  handleUpload(event: any){
     this.newPp = event.target.files[0];
      
  }

  verifyMates(role: RoleEnum){
    if(this.mates.find(p => p.profile.role === role)){
      return true;
    }
    return false;
  }

}
