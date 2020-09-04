import {Component, OnDestroy, OnInit} from '@angular/core';
import {AngularFireDatabase, AngularFireObject} from '@angular/fire/database';
import * as firebase from 'firebase';

@Component({
  selector: 'app-team-room',
  templateUrl: './team-room.component.html',
  styleUrls: ['./team-room.component.css']
})
export class TeamRoomComponent implements OnDestroy {

  roomTeam;
  roomData;
  roomChat;
  message;
  messageArray;
  player;

  roomChatData: AngularFireObject<any>;


  constructor(public af: AngularFireDatabase) { }

  ngOnDestroy(){
    //this.af.object("/list/" + "/FUNCIONOU").set(true);
  }

  filterPlayersTeam(){
    console.log(" ROOM DATA ROOM COMPONENT: ", this.roomData);
    console.log("ROMOM PLAYERS:", this.roomData.players);
    this.roomTeam = this.roomData.players;
    console.log("PLayers:",this.roomTeam);
  }

  createChatData(){
    console.log("VER AGORA!!!!!:",this.roomTeam[0].summonerName );
    this.roomChatData = this.af.object("/rooms/" + this.roomTeam[0].summonerName +"/chat");
    this.roomChatData.snapshotChanges().subscribe(action => {
      console.log(action.type);
      console.log(action.key);
      console.log(action.payload.val());
      console.log("NOVA MENSAGE!:");
      //this.messageArray = action.payload.val();
      this.messageArray = Object.keys(action.payload.val()).map(key => action.payload.val()[key]);
      console.log("MESSAGES:", this.messageArray);
    });
  }

  updateChatMessage(message){
    this.message = message.target.value;
    console.log("Message: ",this.message);
    //this.messageArray[0] = this.message;
    this.sendChatMessage();
  }

  sendChatMessage(){
    console.log("Player a enviar mensaagem:", this.player);
    firebase.database().ref("/rooms/" + this.roomTeam[0].summonerName +"/chat").push({
      player: this.player,
      message: this.message});



    // this.af.object("/rooms/" + this.roomTeam[0].summonerName +"/chat" ).set( {
    //   player: this.player,
    //   message: this.message}
    // );
  }

}
