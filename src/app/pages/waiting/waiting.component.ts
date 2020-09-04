import {Component, OnInit, ViewChild} from '@angular/core';
import {AddPlayerComponent} from '../add-player/add-player.component';
import {TeamFunctionsService} from '../../services/team-functions.service';
import {AngularFireDatabase, AngularFireObject} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {TeamRoomComponent} from '../../component/team-room/team-room.component';

@Component({
  selector: 'app-waiting',
  templateUrl: './waiting.component.html',
  styleUrls: ['./waiting.component.css']
})
export class WaitingComponent implements OnInit {

  @ViewChild(TeamRoomComponent) teamRoomComponent;



  waitingStatus = false;



  actualTeam;
  actualTeamLength;
  actualTeamRank;
  teamsList;
  teamListArray;
  matchType;
  missingPlayers;
  playersRoles = [];

  allPlayers = [];

  finalTeam;
  playerSelectedStatusVar;
  playerThatSearchedStatus: AngularFireObject<any>;
  playerThatSearched;
  roomLeader: boolean = true;
  playerThatSearchedName;





  start1;
  testeDeVer1;
  testedeVer2;

  teste100;





  itemRef: AngularFireObject<any>;
  playerSelectedStatus: AngularFireObject<any>;
  item: Observable<any>;
  constructor(
   private addPlayerComponent: AddPlayerComponent,
   public teamFunctionsService: TeamFunctionsService,
   public af: AngularFireDatabase) {

    this.actualTeam = this.teamFunctionsService.actualTeam;

    this.itemRef = af.object("/TESTE/" + "testeDeVer");
    this.itemRef.snapshotChanges().subscribe(action => {
      console.log(action.type);
      console.log(action.key);
      console.log(action.payload.val());
      this.testedeVer2 = action.payload.val();
    });
    // this.playerSelectedStatus = this.af.object("/waiting/" + this.actualTeam[0].summonerName);
    // this.playerSelectedStatus.snapshotChanges().subscribe(action => {
    //   console.log(action.type);
    //   console.log(action.key);
    //   console.log(action.payload.val());
    //   console.log("MUDOU!!!!!!!!!");
    // });


    this.item = this.itemRef.valueChanges();
    window.onunload = function () {

    };
  }

  ngOnInit(): void {
    console.log("add player team:", this.addPlayerComponent.team);
    this.actualTeam = this.teamFunctionsService.actualTeam;
    console.log("actual team:", this.actualTeam);
    this.actualTeamLength = this.actualTeam.length;
    console.log("rank", this.addPlayerComponent.test);
    this.actualTeamRank = this.teamFunctionsService.getTeamRank(this.actualTeam);
    console.log("rank final", this.actualTeamRank);
    console.log("ver:", this.actualTeam.summonerName);
    console.log("ver2:", this.actualTeam[0].summonerName);
    this.missingPlayers = this.teamFunctionsService.getTeamMissingPlayersNumber(this.matchType, this.actualTeam)
    this.playersRoles = this.teamFunctionsService.getPlayersRoles(this.actualTeam);
    console.log("TEAM ROLES;", this.playersRoles);

    console.log("ACTUAL TEAM 000000000000000000000:;", this.actualTeam);
   this.testedeVer2 = this.verUpdate();
   console.log("TESTE DE VER:", this.testedeVer2);

    window.onunload =  () => {
    this.stopWaiting();
    };
  }



  updateMatchType(value){
    this.matchType = value.value;
    console.log("MATCH TYPE:", this.matchType);
  }

  startFastSearch(matchType){
    console.log("TEAM INICIAL", this.actualTeam);
    console.log("starting fast search");
    this.roomLeader = true;
    console.log(" ROOM LEADER:", this.roomLeader);
    this.teamFunctionsService.getAllPlayersWaiting().then(data => {
      this.allPlayers = Object.keys(data.val()).map(key => data.val()[key]);
      console.log("ALL PLAYERS:", this.allPlayers);

      // colocar dentro do if com uma promise

      let playersAccepted = [];

      if(matchType === "duo"){
        console.log("Searching duo partner");
        let duoAcceptedPlayers = [];

        for (let players of this.allPlayers){
          if(players.teamPlayersNumber === 1){
            console.log("NOME 1: ",players.summonerName );
            console.log("NOME Da equipa: ",this.actualTeam[0].summonerName );
            if(players.summonerName != this.actualTeam[0].summonerName){
              duoAcceptedPlayers.push(players);
            }

          }
        }
        console.log("Jogadores duo", duoAcceptedPlayers);
        console.log("TEAM INICIAL", this.actualTeam);


        let duoAceptedRankPlayers = [];
        for (let players of duoAcceptedPlayers){
          if(players.teamRank === this.actualTeam[0].rank){
            console.log("RANK!!!!",players.teamRank );
            duoAceptedRankPlayers.push(players);
          }
        }

        console.log("RANK ACCEPTED PLAYERS:", duoAceptedRankPlayers);
        console.log("TEAM INICIAL", this.actualTeam);

        this.finalTeam = this.actualTeam;
        console.log("TEAM FINAL ANTES:", this.finalTeam);
        this.finalTeam.push(duoAceptedRankPlayers[0]);
        console.log("TEAM INICIAL:", this.actualTeam);
        console.log("TEAM FINAL:", this.finalTeam);

        this.playerThatSearchedName = this.actualTeam[0].summonerName;
        this.alertSelectedPlayers();
        this.createRoom();
        this.teamRoomComponent.player = this.actualTeam[0].summonerName;

        }
    //
    //
    //
    });















    if(matchType === "duo"){
     console.log("Searching duo partner");
     let duoAcceptedPlayers = [];




    }
    if(matchType === "flex3"){

    }
    if(matchType === "flex5"){

    }
  }

  // createRoom(){
  //   this.af.object("/room/" + this.actualTeam[0].summonerName).set({
  //     chat: {},
  //     })
  // }

  startWaiting(){
    this.waitingStatus = true;

    this.af.object("/waiting/" + this.actualTeam[0].summonerName).set(
      { teamRank: this.actualTeamRank,
        teamPlayersNumber: this.actualTeam.length,
        teamRoles: this.playersRoles,
        summonerName: this.actualTeam[0].summonerName,
        teamSelected: false,
        playerThatSearched: '',
      });

    this.af.object("/list/" + this.actualTeam[0].summonerName + "/0").update( {waiting: true});
    console.log("ACTUAL TEAM!!!!!:", this.actualTeam);
    console.log("------------------------------------");

    this.waitingForGettingSelected();

  }

  waitingForGettingSelected(){

    this.playerThatSearchedStatus = this.af.object("/waiting/" + this.actualTeam[0].summonerName + "/playerThatSearched");
    this.playerThatSearchedStatus.snapshotChanges().subscribe(action => {
      console.log(action.type);
      console.log(action.key);
      console.log(action.payload.val());
      console.log("MUDOU!!!!!!!!!");

      this.playerThatSearched  = action.payload.val();
      console.log("PLAYER QUE PESQUISOU!!:", this.playerThatSearched);

      if(this.playerThatSearched != "" && this.playerThatSearched != this.playerThatSearchedName){
        console.log("NAO È O LIDER!!");
        this.transferDataToRoomComponent(this.playerThatSearched);
      }



      // colocar aqui a função de ir todos para um room

    });

    this.playerSelectedStatus = this.af.object("/waiting/" + this.actualTeam[0].summonerName + "/teamSelected");
    this.playerSelectedStatus.snapshotChanges().subscribe(action => {
      console.log(action.type);
      console.log(action.key);
      console.log(action.payload.val());
      console.log("MUDOU!!!!!!!!!");
      if(action.payload.val() === true){
        this.playerSelectedStatusVar = true;
        this.teamRoomComponent.player = this.actualTeam[0].summonerName;






      }

      // colocar aqui a função de ir todos para um room

    });
  }



  stopWaiting(){
    this.af.object("/waiting/" + this.actualTeam[0].summonerName).remove();
    this.af.object("/rooms/" + this.actualTeam[0].summonerName).remove();
    this.af.object("/list/" + this.actualTeam[0].summonerName + "/waiting").set(false);
  }

  alertSelectedPlayers(){
    console.log("FINAL TEAM YEAH!!", this.finalTeam);
    for(let player of this.finalTeam){
      console.log("player:", player.summonerName );
      this.af.object("/waiting/" + player.summonerName).update({
        teamSelected: true,
        playerThatSearched: this.actualTeam[0].summonerName
      });
    }


  }

  createRoom() {
    console.log("ROOM CRIADO" );
    console.log("ROOM CRIADO",this.finalTeam[0].summonerName );
    this.af.object("/rooms/" + this.finalTeam[0].summonerName).set({
      players: this.finalTeam,
      discord: " ",
      chat: " ",
    });






    let counter = 2;

    const interval = setInterval(() => {
      console.log(counter);
      counter--;

      if (counter < 0 ) {
        clearInterval(interval);
        console.log('Ding!');

        this.transferDataToRoomComponent(this.finalTeam[0].summonerName);
      }
    }, 1000);



  }

  transferDataToRoomComponent(player){
    console.log("player a VER!!!",player);
    this.af.object("/rooms/" + player).query.once('value').then(data => {
      this.teamRoomComponent.roomData = data.val();
      this.teamRoomComponent.filterPlayersTeam();
      this.teamRoomComponent.createChatData();
    });
  }


































  testeDeVer(texto){
    this.testeDeVer1 = texto.target.value;
    console.log(this.testeDeVer1);


    this.itemRef.update({ texto: this.testeDeVer1 });

  }

  verUpdate(){
     this.af.object("/TESTE/" + "testeDeVer").query.once('value').then( data => {this.testedeVer2 = data.val();
       console.log("DATA VER:", this.testedeVer2); });
     console.log(this.item);
     this.af.object("/waiting/" + this.actualTeam[0].summonerName).update({teamSelected: true});

  }

  startCountdown(seconds){
    let counter = seconds;

    const interval = setInterval(() => {
      console.log(counter);
      counter--;

      if (counter < 0 ) {
        clearInterval(interval);
        console.log('Ding!');
        this.verUpdate();

      }
    }, 1000);
  }


}
