import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Location} from '@angular/common';
import {SidenavService} from '../../services/sidenav.service';
import {$} from 'protractor';

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
  searchRank;
  searchWaiting;
  array1 = [];
  array2 = [];
  array3;
  searchArray;
  noPlayers = false;
  sidenavStatus = false;

  constructor(public af: AngularFireDatabase,
              private location: Location,
              private sidenav: SidenavService,
             ) { }

  ngOnInit(): void {
    if(!this.sidenav.sidenavStatus){
      console.log("NAO HA SIDENAV");
      this.sidenav.sidenavStatus = this.sidenavStatus;
    }
    this.sidenavStatus = this.sidenav.sidenavStatus ;

  }

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




  gotoBackPage(){
    this.location.back();
  }

  updatePlayerZone(value){
    console.log((value.target as HTMLInputElement).value);
    this.teamZone = (value.target as HTMLInputElement).value;
  }

  updateRank(value){
    console.log((value.target as HTMLInputElement).value);
    this.searchRank = (value.target as HTMLInputElement).value;
  }

  updateWaiting(value){
    console.log((value.target as HTMLInputElement).value);
    this.searchWaiting = (value.target as HTMLInputElement).value;
    console.log("searchwiting", this.searchWaiting);
  }

  listSearch(){

    this.searchArray = [];

    console.log("1", this.searchRank);
    console.log("2", this.searchWaiting);
    console.log("3", this.teamZone);

    if(!this.searchRank && !this.searchWaiting && !this.teamZone){
      console.log("È PRECISO SELECIONAR ALGO");
      alert("Please select the rank,zone and waiting criteria");
      return;
    }


    this.af.object( "/Zone/" + this.teamZone + "/list").query.once('value').then(data => {
      console.log(data.val() as string);
      this.teamsList = data.val() as string;
      const arrayOfArrays = Object.keys(this.teamsList).map(k => this.teamsList[k]);
      console.log("Ver:", arrayOfArrays);
      this.test = arrayOfArrays;


      if(this.searchRank === "all" && this.searchWaiting === "all"){
        this.searchArray = arrayOfArrays;
        console.log("ALL PLAYERS");
        return;
      }

      if(this.searchRank === "all"){

        for (let player of this.array1){
          console.log("0000", player);
          console.log("1111", player[0].waiting.toString());
          console.log("2222", this.searchWaiting);
          if (player[0].waiting.toString() == this.searchWaiting){
            console.log("Passou 222", player);
            this.array2.push(player);
          }
        }

        this.searchArray = this.array2;
        return;
      }



      for(let player of arrayOfArrays){
        console.log("0000", player);
        console.log("1111", player[0].rank);
        console.log("222", this.searchRank);
        if(player[0].teamRank === this.searchRank || player[0].rank === this.searchRank ){
          console.log("Passou", player);
          this.array1.push(player);
        }
      }

      if(this.array1.length === 0){
        this.noPlayers = true;
        console.log("NO PLAYERS");
        alert("No players found, wait a little or change the search criteria");
        return;
      }

      console.log("array 1", this.array1);
      console.log("array 1", this.array1.length);

      if(this.searchWaiting === "all"){
        this.searchArray = this.array1;
        return;
      }

      for (let player of this.array1){
        console.log("0000", player);
        console.log("1111", player[0].waiting.toString());
        console.log("2222", this.searchWaiting);
        if (player[0].waiting.toString() == this.searchWaiting){
          console.log("Passou 222", player);
         this.array2.push(player);
        }
      }

      if(this.array2.length === 0){
        this.noPlayers = true;
        console.log("NO PLAYERS2");
        alert("No players found, wait a little or change the search criteria");
        return;
      }

      console.log("array 2", this.array2);
      this.searchArray = this.array2;
      console.log("LIsta de jogadores", this.test);
    });
  }





}
