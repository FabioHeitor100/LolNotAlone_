import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';

@Component({
  selector: 'app-search-player',
  templateUrl: './search-player.component.html',
  styleUrls: ['./search-player.component.css']
})
export class SearchPlayerComponent implements OnInit {

  teamsList;
  displayedColumns: string[] = ['role'];
  test;

  constructor(public af: AngularFireDatabase) { }

  ngOnInit(): void {
    this.listSearch();
  }


  listSearch(){
    this.af.object("/list").query.once('value').then(data => {
      console.log(data.val() as string);
      this.teamsList = data.val() as string;
      const arrayOfArrays = Object.keys(this.teamsList).map(k => this.teamsList[k]);
      console.log("Ver:", arrayOfArrays);
      this.test = arrayOfArrays;
      console.log("LIsta de jogadores", this.test);
    });
  }

}
