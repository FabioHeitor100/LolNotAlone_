import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {AddPlayerComponent} from '../add-player/add-player.component';
import {TeamFunctionsService} from '../../services/team-functions.service';
import {AngularFireDatabase, AngularFireObject} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {TeamRoomComponent} from '../../component/team-room/team-room.component';
import { Location } from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {SidenavService} from '../../services/sidenav.service';
import {Howl, Howler} from 'howler';

@Component({
  selector: 'app-waiting',
  templateUrl: './waiting.component.html',
  styleUrls: ['./waiting.component.css']
})
export class WaitingComponent implements OnInit {

  @ViewChild(TeamRoomComponent) teamRoomComponent;





  waitingStatus = false;
  teamZone;

  duoPreference;



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
  duoVisible;
  trioVisible;
  flexVisible;
  fiveVsFive;

  rolesToLookFor;
  finalPlayersSelected = [];
  randomNumber;






  start1;
  testeDeVer1;
  testedeVer2;

  teste100;


  sound;
  actualTeamVisible;

  sidenavStatus = false;

  itemRef: AngularFireObject<any>;
  playerSelectedStatus: AngularFireObject<any>;
  item: Observable<any>;
  constructor(
   private addPlayerComponent: AddPlayerComponent,
   public teamFunctionsService: TeamFunctionsService,
   public af: AngularFireDatabase,
   private location: Location,
   public dialog: MatDialog,
   private sidenav: SidenavService) {

    this.actualTeam = this.teamFunctionsService.actualTeam;

    console.log("ACTUAL TEAM", this.actualTeam);

    if(this.actualTeam){


    if(this.actualTeam.length === 1){
      console.log("TUDO");
      this.duoVisible = true;
      this.trioVisible = true;
      this.flexVisible = true;
    }
    else if(this.actualTeam.length === 2){
      console.log("SO TRIO E FLEX");
      this.trioVisible = true;
      this.flexVisible = true;
    } else if(this.actualTeam.length === 3 || this.actualTeam.length === 4){
      console.log("SO FLEX");
      this.flexVisible = true;
    }else if(this.actualTeam.length === 5){
      console.log("SO 5v5 EQUIPAS");
      this.fiveVsFive = true;
    }
    } else {
      window.location.href = 'addPlayer';
    }

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



    this.sidenavStatus = this.sidenav.sidenavStatus ;
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
    this.teamZone = this.teamFunctionsService.teamZone;

    console.log("ACTUAL TEAM 000000000000000000000:;", this.actualTeam);
   this.testedeVer2 = this.verUpdate();
   console.log("TESTE DE VER:", this.testedeVer2);


   this.actualTeamVisible = true;




    window.onunload =  () => {
    this.stopWaiting();
    };
  }



  updateMatchType(value){
    this.matchType = (value.target as HTMLInputElement).value;
    console.log("MATCH TYPE:", this.matchType);
  }

  updateLanePreference(value){
    this.duoPreference = (value.target as HTMLInputElement).value;
    console.log("DUO PREfENCE:", this.duoPreference);
  }


  startFastSearch(matchType) {


    this.finalTeam = [];
    console.log("-----------------------------------------------------");
    console.log("FINALLLLLLL TEAMMMMMM!! ", this.finalTeam);
    console.log("THIS ACTUAL TEAM!!!!! ", this.actualTeam);
    console.log(JSON.stringify(this.actualTeam));
    console.log("-----------------------------------------------------");
    console.log("Match type", this.matchType);
    console.log("TEAM INICIAL", this.actualTeam);
    console.log("starting fast search");
    this.roomLeader = true;
    console.log(" ROOM LEADER:", this.roomLeader);
    this.teamFunctionsService.getAllPlayersWaiting(this.teamZone, this.matchType).then(data => {
      this.allPlayers = Object.keys(data.val()).map(key => data.val()[key]);
      console.log("ALL PLAYERS:", this.allPlayers);
      // colocar dentro do if com uma promise
      let playersAccepted = [];
      if (matchType === "duo") {


        console.log("1111111111111111");

        this.teamFunctionsService.getAllPlayersWaiting(this.teamZone, this.matchType).then( data => {
          this.allPlayers = Object.keys(data.val()).map(key => data.val()[key]);
          let duoAcceptedPlayers = [];
          console.log("Searching duo partner");

          console.log("222222222222222");
          for (let players of this.allPlayers) {
            if (players.teamPlayersNumber === 1) {
              console.log("NOME 1: ", players.summonerName);
              console.log("NOME Da equipa: ", this.actualTeam[0].summonerName);
              if (players.summonerName != this.actualTeam[0].summonerName) {
                duoAcceptedPlayers.push(players);
              }

            }




          }

          console.log("3333333333333");
          if (duoAcceptedPlayers.length <= 0) {
            console.log("NAO EXISTEM JOGADORES");
            alert("No players found, wait a little or go to the search area to see if any player is online");
            return;
          }


          console.log("Jogadores duo", duoAcceptedPlayers);
          console.log("TEAM INICIAL", this.actualTeam);

          let duoAceptedRankPlayers = [];

          for (let players of duoAcceptedPlayers) {
            if (players.teamRank === this.actualTeam[0].rank) {
              console.log("44444444444444444");
              console.log("RANK!!!!", players.teamRank);
              duoAceptedRankPlayers.push(players);
            }
          }

          if (duoAceptedRankPlayers.length <= 0) {
            console.log("NAO EXISTEM JOGADORES2");
            alert("No players found, wait a little or go to the search area to see if any player is online");
            return;
          }

          let duoPreferencePlayers = [];

          console.log("555555555555555555555");




          for(let players of duoAceptedRankPlayers){
            if(players.teamRoles[0] === this.duoPreference){
              duoPreferencePlayers.push(players);
            }
          }



          console.log("LENHT", duoPreferencePlayers.length);
          console.log("DUO PREFERENCE PLAYERS", duoPreferencePlayers);

          if(duoPreferencePlayers.length >0){
            console.log("DUO PREFERENCE PART");
            this.randomNumber = Math.floor(Math.random() * this.finalPlayersSelected.length);
            console.log("RANDOM NUMBER", this.randomNumber);
            this.actualTeamVisible = false;
            this.finalTeam = this.actualTeam;
            console.log("777777777777777777");
            console.log("TEAM FINAL ANTES:", this.finalTeam);
            this.finalTeam.push(duoPreferencePlayers[this.randomNumber]);
            console.log("TEAM INICIAL:", this.actualTeam);
            console.log("TEAM FINAL:", this.finalTeam);

            this.playerThatSearchedName = this.actualTeam[0].summonerName;
            this.alertSelectedPlayers();
            this.createRoom();
            this.teamRoomComponent.player = this.actualTeam[0].summonerName;

          } else if (duoPreferencePlayers.length === 0){

            console.log("NORmAL PART");

         // this.playSound();
            console.log("THIS ACTUAL TEAM!!!!! ", this.actualTeam);
            console.log(JSON.stringify(this.actualTeam));
          this.randomNumber = Math.floor(Math.random() * this.finalPlayersSelected.length);
            console.log("THIS ACTUAL TEAM!!!!! ", this.actualTeam);
            console.log(JSON.stringify(this.actualTeam));
          this.actualTeamVisible = false;
            console.log("THIS ACTUAL TEAM!!!!! ", this.actualTeam);
            console.log(JSON.stringify(this.actualTeam));
          //this.finalTeam = this.actualTeam;
            this.finalTeam =[...this.actualTeam];
            console.log("THIS ACTUAL TEAM!!!!! ", this.actualTeam);
            console.log(JSON.stringify(this.actualTeam));
          this.finalTeam.push(duoAceptedRankPlayers[this.randomNumber]);
            console.log("THIS ACTUAL TEAM!!!!! ", this.actualTeam);
            console.log(JSON.stringify(this.actualTeam));

            this.playerThatSearchedName = this.actualTeam[0].summonerName;
            this.alertSelectedPlayers();
            this.createRoom();
            this.teamRoomComponent.player = this.actualTeam[0].summonerName;
        }


        });










        console.log("88888888888888888");


      }


      if (matchType === "5v5") {
        console.log("START PESQUISAR 5v5");
        let teamAcceptedPlayers = [];
        for (let players of this.allPlayers) {
          if (players.teamPlayersNumber === 5) {
            console.log("NOME 1: ", players.summonerName);
            console.log("NOME Da equipa: ", this.actualTeam[0].summonerName);
            if (players.summonerName != this.actualTeam[0].summonerName) {
              teamAcceptedPlayers.push(players);
            }

          }




        }
        if (teamAcceptedPlayers.length <= 0) {
          console.log("NAO EXISTEM JOGADORES");
          alert("No players found, wait a little or go to the search area to see if any player is online");
          return;
          //this.dialog.open(WaitingComponent);
        }
        let teamAcceptedRankPlayers = [];

        for ( let players of teamAcceptedPlayers){
          console.log(this.actualTeamRank);
          console.log(players.teamRank);
          if(this.actualTeamRank === players.teamRank){
            teamAcceptedRankPlayers.push(players);
          }
        }
        this.randomNumber = Math.floor(Math.random() * this.finalPlayersSelected.length);
        console.log("RANDOM NUMBER", this.randomNumber);

        console.log("PLAYER A PROCURAR;", teamAcceptedRankPlayers[0].summonerName);
        this.actualTeamVisible = false;
        this.finalTeam = [];
        for(let player of this.actualTeam){
          this.finalTeam.push(player);
        }

        this.af.object( "/Zone/" + this.teamZone + "/list/" + teamAcceptedRankPlayers[0].summonerName).query.once('value').then(data => {
          console.log(data.val() as string);
          let selectedPlayers = Object.keys(data.val()).map(k => data.val()[k]);

          for(let player of selectedPlayers){
            this.finalTeam.push(player);
          }
          this.playerThatSearchedName = this.actualTeam[0].summonerName;

          console.log("FINAL TEAM YEAH!!", this.finalTeam);
          this.alertSelectedPlayers();
          this.createRoom();
          this.teamRoomComponent.player = this.actualTeam[0].summonerName;

        });


        console.log("Jogadores 5v5", teamAcceptedPlayers);
        console.log("Jogadores 5v5 rank igual", teamAcceptedRankPlayers);
        console.log("TEAM INICIAL", this.actualTeam);
      }
    });

    if (matchType === "flex3") {

    }
    if (matchType === "flex5") {

      this.teamFunctionsService.getAllPlayersWaiting(this.teamZone, this.matchType).then(data => {
        this.allPlayers = Object.keys(data.val()).map(key => data.val()[key]);
        console.log("ALL FLEX PLAYERS", this.allPlayers);

        let acceptedFlexPlayers = [];

        console.log("ACTUAL TEAM::", this.actualTeam);


        if (this.actualTeam.length === 4) {
          console.log("TEAM OF 4 flex");
          console.log("ROLES VER AGORA",this.playersRoles);

          this.rolesToLookFor = this.teamFunctionsService.getMissingRoles(this.playersRoles);

          for (let players of this.allPlayers) {
            if (players.teamPlayersNumber === 1) {
              console.log("NOME 1: ", players.summonerName);
              console.log("VER AGORAAAAA!!!!", players);
              console.log("NOME Da equipa: ", this.actualTeam[0].summonerName);
              if (players.summonerName != this.actualTeam[0].summonerName) {

                for (let role of this.rolesToLookFor){
                  console.log("ROLES DOS JOGADORES PESQUISADOS:", players.teamRoles);
                  for (let roleSearched of players.teamRoles){
                    if(role === roleSearched){
                      acceptedFlexPlayers.push(players);
                  }

                  }



                }

              }

            }
          }

          for(let players of acceptedFlexPlayers){
            if (players.teamRank === this.actualTeamRank){
            this.finalPlayersSelected.push(players);
            }
          }

          this.randomNumber = Math.floor(Math.random() * this.finalPlayersSelected.length);
          console.log("RANDOM NUMBER", this.randomNumber);
          this.actualTeamVisible = false;

          this.finalTeam = this.actualTeam;
          console.log("TEAM FINAL ANTES:", this.finalTeam);
          console.log("TEAM INICIAL:", this.actualTeam);
          this.finalTeam.push(this.finalPlayersSelected[this.randomNumber]);
          console.log("EQUIPA FINAL!!!!!!!!!!!!!!", this.finalTeam);



          console.log("acceptedFlexPlayers2DOIS!!", acceptedFlexPlayers);
          console.log("finalPlayersSelected!!", this.finalPlayersSelected);

            if (acceptedFlexPlayers.length <= 0) {
              console.log("NAO EXISTEM JOGADORES");
              alert("No players found, wait a little or go to the search area to see if any player is online");
              //this.dialog.open(WaitingComponent);
            }

        }

      });


    }
  }

  // createRoom(){
  //   this.af.object("/room/" + this.actualTeam[0].summonerName).set({
  //     chat: {},
  //     })
  // }

  startWaiting(){
    console.log("Match type", this.matchType);
    console.log("THIS TEAM ZONE",this.teamFunctionsService.teamZone);
    console.log("THIS TEAM ZONE",this.teamZone);
   // console.log("TEAM COMPONENT TEAM ZONE:", this.teamRoomComponent.teamZone);
    console.log("TEAM COMPONENT TEAM ZONE 222:", this.teamZone);
    this.waitingStatus = true;
    this.teamRoomComponent.teamZone = this.teamZone;


    this.af.object( "/Zone/" + this.teamZone +"/waiting/" + this.matchType + "/" + this.actualTeam[0].summonerName).set(
      { teamRank: this.actualTeamRank,
        teamPlayersNumber: this.actualTeam.length,
        teamRoles: this.playersRoles,
        summonerName: this.actualTeam[0].summonerName,
        teamSelected: false,
        playerThatSearched: '',
      });

    this.af.object("/Zone/" + this.teamZone +"/list/" + this.actualTeam[0].summonerName + "/0").update( {waiting: true});
    console.log("ACTUAL TEAM!!!!!:", this.actualTeam);
    console.log("------------------------------------");

   this.waitingForGettingSelected();

  }

  waitingForGettingSelected(){

    this.playerThatSearchedStatus = this.af.object("/Zone/" + this.teamZone + "/waiting/" + this.matchType + "/" + this.actualTeam[0].summonerName + "/playerThatSearched");
    this.playerThatSearchedStatus.snapshotChanges().subscribe(action => {
      console.log(action.type);
      console.log(action.key);
      console.log(action.payload.val());
      console.log("MUDOU o observable de playerThatSearched");

      this.playerThatSearched  = action.payload.val();
      console.log("PLAYER QUE PESQUISOU!!:", this.playerThatSearched);

      if(this.playerThatSearched != "" && this.playerThatSearched != this.playerThatSearchedName){
        let sound = new Howl({
          src: ['/assets/File0117.mp3'],
          volume: 0.2,

        });
        // src/assets/File0117.mp3
        sound.play();
        console.log("NAO È O LIDER!!");
        console.log("IR pArA O ROOM COMPONENT");
        this.transferDataToRoomComponent(this.playerThatSearched);
      }



      // colocar aqui a função de ir todos para um room

    });

    this.playerSelectedStatus = this.af.object( "/Zone/" + this.teamZone + "/waiting/" + this.matchType + "/" + this.actualTeam[0].summonerName + "/teamSelected");
    this.playerSelectedStatus.snapshotChanges().subscribe(action => {
      console.log(action.type);
      console.log(action.key);
      console.log(action.payload.val());
      console.log("MUDOU o observable de teamSelected");
      if(action.payload.val() === true){
        this.playerSelectedStatusVar = true;
        // this.sound = new Audio();
        // this.sound.src = 'src/assets/Audio/Welcome Rift.mp3';
        // this.sound.load();
        // this.sound.play();
        this.teamRoomComponent.player = this.actualTeam[0].summonerName;






      }

      // colocar aqui a função de ir todos para um room

    });
  }



  stopWaiting(){
    this.af.object( "/Zone/" + this.teamZone + "/list/" + this.actualTeam[0].summonerName+ "/0").update( {waiting: false});
    this.af.object("/Zone/" + this.teamZone + "/waiting/" + this.matchType + "/" + this.actualTeam[0].summonerName).remove();
    this.af.object("/Zone/" + this.teamZone + "/rooms/" + this.actualTeam[0].summonerName).remove();
   // this.af.object( "/Zone/" + this.teamZone + "/list/" + this.actualTeam[0].summonerName + "/waiting" ).update(false);
    this.waitingStatus = false;
  }

  alertSelectedPlayers(){
    console.log("FINAL TEAM YEAH!!", this.finalTeam);
    for(let player of this.finalTeam){
      console.log("player:", player.summonerName);
      this.af.object("/Zone/" + this.teamZone + "/waiting/" + this.matchType + "/" + player.summonerName).update({
        teamSelected: true,
        playerThatSearched: this.actualTeam[0].summonerName
      });
    }


  }

  createRoom() {
    console.log("ROOM CRIADO" );
    console.log("ROOM CRIADO",this.finalTeam[0].summonerName );
    this.af.object("/Zone/" + this.teamZone + "/rooms/" + this.finalTeam[0].summonerName).set({
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
    console.log("PASSAR A DATA PARA O ROOM COMPONENT",player);
    this.af.object("/Zone/" + this.teamZone + "/rooms/" + player).query.once('value').then(data => {
      this.teamRoomComponent.roomData = data.val();
      console.log("DATA DO ROOM COMPONRNT:", this.teamRoomComponent.roomData);
      this.actualTeamVisible = false;
      this.finalTeam = this.teamRoomComponent.roomData.players;
      this.teamRoomComponent.filterPlayersTeam();
      this.teamRoomComponent.createChatData();
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


  gotoBackPage(){
    this.stopWaiting();
    this.location.back();
  }


playSound(){
  this.sound = new Audio();
  this.sound.src = 'src/assets/Audio/Welcome Rift.mp3';
  this.sound.load();
  this.sound.play();
}
  //
  // @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
  //   console.log("Processing beforeunload...");
  //   // Do more processing...
  //   console.log("event.returnValue", event.returnValue);
  //   event.returnValue = false;
  //   console.log("event.returnValue", event.returnValue);
  // }

  @HostListener("window:beforeunload", ["$event"]) beforeUnloadHandler(event: Event) {
    console.log("window:beforeunload");
    event.returnValue = "You will leave this page" as any;
  }

  @HostListener("window:unload", ["$event"]) unloadHandler(event: Event) {
    this.stopWaiting();
    alert("Hello");
  }
























  testeDeVer(texto){
    this.testeDeVer1 = texto.target.value;
    console.log(this.testeDeVer1);


    this.itemRef.update({ texto: this.testeDeVer1 });

  }

  verUpdate(){
  //    this.af.object("/TESTE/" + "testeDeVer").query.once('value').then( data => {this.testedeVer2 = data.val();
  //      console.log("DATA VER:", this.testedeVer2); });
  //    console.log(this.item);
  //    this.af.object("/waiting/" + this.actualTeam[0].summonerName).update({teamSelected: true});
  //
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
