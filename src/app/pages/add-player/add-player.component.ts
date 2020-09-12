import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {WaitingComponent} from '../waiting/waiting.component';
import {TeamFunctionsService} from '../../services/team-functions.service';
import {Location} from '@angular/common';
import {SidenavService} from '../../services/sidenav.service';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent implements OnInit {

  team = [
    {
      summonerName: '',
      rank: '',
      role: '',
    }
  ];


  arrayLenghtNow;
  teamZone;
  teamRankValue;
  test;

  sidenavStatus = false;


  sound;


  constructor(public af: AngularFireDatabase,
              public teamFunctionsService: TeamFunctionsService,
              private location: Location,
              private sidenav: SidenavService) { }

  ngOnInit(): void {
  }

  increaseTeam(){
    this.arrayLenghtNow = this.team.length;
    this.team.length = this.team.length + 1;
    this.team.length = this.arrayLenghtNow;
    this.team[this.arrayLenghtNow] = {
      summonerName: '',
      rank: '',
      role: '',
    };
    console.log('Array team:', this.team);
  }


  deletePlayer(index){
    this.team.splice(index, 1);
  }

  updatePlayerSumonerName(name,i){
    console.log(name.target.value);
    this.team[i].summonerName = name.target.value;
  }

  updatePlayerRole(value,i){
    console.log(value.value);
    this.team[i].role = value.value;
  }

  updatePlayerRank(value,i){
    console.log(value.value);
    this.team[i].rank = value.value;
  }

  placeOnTheList(){
    for (let player of this.team){
      if(player.summonerName === ""){
        player.summonerName = "RIOT GAMES";
      }
    }
    this.test = this.teamFunctionsService.getTeamRank(this.team);
    console.log(this.test);
    this.teamFunctionsService.actualTeam = this.team;
    this.teamFunctionsService.teamZone = this.teamZone;
    this.teamRankValue = this.teamFunctionsService.getTeamRank(this.team);
    console.log("TeamRank:",this.teamRankValue);

    console.log("VER ISTO PORRA!!!:", this.team[0]);
    this.af.object("/Zone/"+ this.teamZone +"/list/" + this.team[0].summonerName).update(this.team);
    this.af.object("/Zone/"+ this.teamZone +"/list/" + this.team[0].summonerName + "/0").update({teamRank: this.teamRankValue});

    console.log("TEAM ZONE: ", this.teamZone);
    console.log("SERVICE TEAM ZONE:", this.teamFunctionsService.teamZone);
  }

  gotoBackPage(){
    this.location.back();
  }

  updatePlayerZone(value){
    console.log(value.value);
    this.teamZone = value.value;
  }


  // tslint:disable-next-line:typedef
  toggleRightSidenav() {

    if(this.sidenavStatus === true){
      this.sidenav.close();
      this.sidenavStatus = false;
    }

    else if (this.sidenavStatus === false){
      this.sidenav.open();
      this.sidenavStatus = true;
    }



  }


}
