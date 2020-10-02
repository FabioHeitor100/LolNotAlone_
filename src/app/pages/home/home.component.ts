import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {AngularFireDatabase} from '@angular/fire/database';
import {SidenavService} from '../../services/sidenav.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  playerData;
  playerList;
  playerWaiting =0;
  playersListed =0;
  sidenavStatus = false;


  constructor(public af: AngularFireDatabase,
              private sidenav: SidenavService) { }

  ngOnInit(): void {
    if(!this.sidenav.sidenavStatus){
      console.log("NAO HA SIDENAV");
      this.sidenav.sidenavStatus = this.sidenavStatus;
    }
    this.sidenavStatus = this.sidenav.sidenavStatus ;

    this.af.object("/Zone").query.once('value').then(data => {
      this.playerData = Object.keys(data.val()).map(key => data.val()[key]);
      console.log("playerLIst:", this.playerData);
      console.log(this.playerData.length);

      for(let zone of this.playerData){
        let players = Object.values(zone.list);
        console.log("test", players);
        console.log(players.length);

        this.playersListed = this.playersListed + players.length;
        // const zonePlayers = zone.length;
        // console.log(zonePlayers);
        //
        //
        //
        // // for ( let player of zone.list){
        // //   console.log(player);
        // // }

        if( zone.waiting){
          console.log("tem");
          let waitingPlayers = Object.values(zone.waiting);
          console.log(waitingPlayers);
          this.playerWaiting = this.playerWaiting + waitingPlayers.length;
        }

        //this.playersListed = this.playersListed + 1;
      }
    });

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

}
