import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Location} from '@angular/common';

@Component({
  selector: 'app-search-player',
  templateUrl: './search-player.component.html',
  styleUrls: ['./search-player.component.css']
})
export class SearchPlayerComponent implements OnInit {

  teamsList;
  displayedColumns: string[] = ['role'];
  test;
  panelOpenState = false;
  teamZone;

  constructor(public af: AngularFireDatabase,
              private location: Location) { }

  ngOnInit(): void {

  }


  listSearch(){
    this.af.object( "/Zone/" + this.teamZone + "/list").query.once('value').then(data => {
      console.log(data.val() as string);
      this.teamsList = data.val() as string;
      const arrayOfArrays = Object.keys(this.teamsList).map(k => this.teamsList[k]);
      console.log("Ver:", arrayOfArrays);
      this.test = arrayOfArrays;
      console.log("LIsta de jogadores", this.test);
    });
  }

  gotoBackPage(){
    this.location.back();
  }

  updatePlayerZone(value){
    console.log(value.value);
    this.teamZone = value.value;
  }


}
