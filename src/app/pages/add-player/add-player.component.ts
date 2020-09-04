import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {WaitingComponent} from '../waiting/waiting.component';
import {TeamFunctionsService} from '../../services/team-functions.service';

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


  test;



  constructor(public af: AngularFireDatabase,
              public teamFunctionsService: TeamFunctionsService) { }

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
    this.test = this.teamFunctionsService.getTeamRank(this.team);

    console.log(this.test);

    this.teamFunctionsService.actualTeam = this.team;
    this.af.object("/list/" + this.team[0].summonerName).update(this.team);
  }


}
