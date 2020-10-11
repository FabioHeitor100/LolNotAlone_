import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Location} from '@angular/common';
import {SidenavService} from '../../services/sidenav.service';
import * as $ from 'jquery';

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
  array3 = [];

  searchArray;
  noPlayers = false;
  sidenavStatus = false;
  teamSize;


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

  updateTeamSize(value){
    console.log((value.target as HTMLInputElement).value);
    this.teamSize = (value.target as HTMLInputElement).value;
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
   // $('#myModal').modal('show');
    this.searchArray = [];
    this.array1 = [];
    this.array2 = [];
    this.array3 = [];


    console.log("1", this.searchRank);
    console.log("2", this.searchWaiting);
    console.log("3", this.teamZone);
    console.log("4", this.teamSize);


    if(!this.searchRank && !this.searchWaiting && !this.teamZone && !this.teamSize){
      console.log("È PRECISO SELECIONAR ALGO");
      alert("Please select the Team size,rank,zone and waiting criteria");
      return;
    }


    this.af.object( "/Zone/" + this.teamZone + "/list").query.once('value').then(data => {
      console.log(data.val() as string);
      this.teamsList = data.val() as string;
      const arrayOfArrays = Object.keys(this.teamsList).map(k => this.teamsList[k]);
      console.log("Ver:", arrayOfArrays);


      if(this.searchRank === "all" && this.searchWaiting === "all"){
        console.log("all all");
        this.array1 = arrayOfArrays;

        for (let player of this.array1) {
          let length = Object.keys(player).length;
          if( length.toString() === this.teamSize){
            this.array3.push(player);
          }

        }



        this.searchArray = this.array3;
        console.log("ALL PLAYERS",this.searchArray);
        if(this.searchArray.length === 0){
          alert("No players found, wait a little or change the search criteria");
        }
        return;
      }

      else if(this.searchRank === "all" && this.searchWaiting !== "all"){
        console.log("all no");
        console.log("Array1:", this.array1);

        for (let player of arrayOfArrays){
          console.log("0000", player);
          console.log("1111", player[0].waiting.toString());
          console.log("2222", this.searchWaiting);
          if (player[0].waiting.toString() === this.searchWaiting){
            console.log("Passou 222", player);
            this.array2.push(player);
          }
        }

        for (let player of this.array2) {
          let length = Object.keys(player).length;
          if( length.toString() === this.teamSize){
            this.array3.push(player);
          }

        }
        console.log("Players serched", this.array3);
        this.searchArray = this.array3;
        if(this.searchArray.length === 0){
          alert("No players found, wait a little or change the search criteria");
        }
        return;
      }

      else if(this.searchRank !== "all" && this.searchWaiting === "all"){

        console.log("no all");
        for(let player of arrayOfArrays){
        console.log("0000", player);
        console.log("1111", player[0].teamRank);
        console.log("222", this.searchRank);
        if(player[0].teamRank === this.searchRank ){
          console.log("Passou", player);
          this.array1.push(player);
        }
      }
        for (let player of this.array1) {
          let length = Object.keys(player).length;
          if( length.toString() === this.teamSize){
            this.array3.push(player);
          }

        }
        console.log("Players serched", this.array3);
      this.searchArray = this.array3;
        if(this.searchArray.length === 0){
          alert("No players found, wait a little or change the search criteria");
        }
       return;
      }



      else if(this.searchRank !== "all" && this.searchWaiting !== "all"){

        console.log("no no");
        for(let player of arrayOfArrays){
          console.log("0000", player);
          console.log("1111", player[0].rank);
          console.log("222", this.searchRank);
          if(player[0].teamRank === this.searchRank){
            console.log("Passou", player);
            this.array1.push(player);
          }
        }

        for (let player of this.array1){
          console.log("0000", player);
          console.log("1111", player[0].waiting.toString());
          console.log("2222", this.searchWaiting);
          if (player[0].waiting.toString() === this.searchWaiting){
            console.log("Passou 222", player);
            this.array2.push(player);
          }
        }

        for (let player of this.array2) {
          let length = Object.keys(player).length;
          if( length.toString() === this.teamSize){
            this.array3.push(player);
          }

        }
        console.log("Players serched", this.array3);
        this.searchArray = this.array3;
        if(this.searchArray.length === 0){
          alert("No players found, wait a little or change the search criteria");
        }
      }


      //
      //
      // if(this.array1.length === 0){
      //   this.noPlayers = true;
      //   console.log("NO PLAYERS");
      //   alert("No players found, wait a little or change the search criteria");
      //   return;
      // }
      //
      // console.log("array 1", this.array1);
      // console.log("array 1", this.array1.length);
      //
      // if(this.searchWaiting === "all"){
      //   this.searchArray = this.array1;
      //   return;
      // }
      //
      // for (let player of this.array1){
      //   console.log("0000", player);
      //   console.log("1111", player[0].waiting.toString());
      //   console.log("2222", this.searchWaiting);
      //   if (player[0].waiting.toString() == this.searchWaiting){
      //     console.log("Passou 222", player);
      //    this.array2.push(player);
      //   }
      // }
      //
      // if(this.array2.length === 0){
      //   this.noPlayers = true;
      //   console.log("NO PLAYERS2");
      //   alert("No players found, wait a little or change the search criteria");
      //   return;
      // }
      //
      // console.log("array 2", this.array2);
      // this.searchArray = this.array2;
      // console.log("LIsta de jogadores", this.test);
    });
  }





}
