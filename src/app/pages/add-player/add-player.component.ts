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
      waiting: false,
    }
  ];


  arrayLenghtNow;
  teamZone;
  teamRankValue;
  test;

  teamValid;

  sidenavStatus = false;


  sound;




  constructor(public af: AngularFireDatabase,
              public teamFunctionsService: TeamFunctionsService,
              private location: Location,
              private sidenav: SidenavService) { }

  ngOnInit(): void {
    if(!this.sidenav.sidenavStatus){
      console.log("NAO HA SIDENAV");
      this.sidenav.sidenavStatus = this.sidenavStatus;
    }
    this.sidenavStatus = this.sidenav.sidenavStatus ;
  }

  openLaneButton(){

  }


  increaseTeam(){
    this.arrayLenghtNow = this.team.length;
    this.team.length = this.team.length + 1;
    this.team.length = this.arrayLenghtNow;
    this.team[this.arrayLenghtNow] = {
      waiting: false,
      summonerName: '',
      rank: '',
      role: ''
    };
    console.log('Array team:', this.team);
    this.checkIfFormIsCompleted();
  }


  deletePlayer(index){
    this.team.splice(index, 1);
    this.checkIfFormIsCompleted();

  }

  updatePlayerSumonerName(name,i){
    console.log(name.target.value);
    this.team[i].summonerName = name.target.value;
    this.checkIfFormIsCompleted();
  }

  updatePlayerRole(value,i){
    console.log(value.value);
    console.log(value);
    console.log(i);
    console.log((value.target as HTMLInputElement).value);
    this.team[i].role = (value.target as HTMLInputElement).value;
    this.checkIfFormIsCompleted();
  }

  updatePlayerRank(value,i){
    console.log(value.value);
    this.team[i].rank = (value.target as HTMLInputElement).value;
    this.checkIfFormIsCompleted();
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
    this.teamZone = (value.target as HTMLInputElement).value;
    this.checkIfFormIsCompleted();
  }


  // tslint:disable-next-line:typedef
  toggleRightSidenav() {

    if(this.sidenavStatus === true){
      this.sidenav.close();
      this.sidenavStatus = false;
      this.sidenav.sidenavStatus = this.sidenavStatus;
      return;
    }

    if (this.sidenavStatus === false){
      this.sidenav.open();
      this.sidenavStatus = true;
      this.sidenav.sidenavStatus = this.sidenavStatus;
      return;
    }


  }

  checkIfFormIsCompleted(){
    for(let players of this.team){
      if(players.summonerName === ""){
        this.teamValid = false;
        return;
      }
      if(players.role === ""){
        this.teamValid = false;
        return;
      }
      if(players.rank === ""){
        this.teamValid = false;
        return;
      }
    }

    if(!this.teamZone){
      this.teamValid = false;
      return;
    }

    this.teamValid = true;
  }

}
