import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class TeamFunctionsService {


  actualTeam;

  constructor(public af: AngularFireDatabase) { }

  getTeamRank(teamArray){
    let rankNumbers = 0;
    let actualRankNumber;
    for(const rank of teamArray){
      let actualRank;
      actualRank = rank.rank;
      if(actualRank == "iron"){
        rankNumbers = rankNumbers +1;
      }
      if(actualRank == "bronze"){
        rankNumbers = rankNumbers +2;
      }
      if(actualRank == "silver"){
        rankNumbers = rankNumbers +3;
      }
      if(actualRank == "gold"){
        rankNumbers = rankNumbers +4;
      }
      if(actualRank == "platinum"){
        rankNumbers = rankNumbers +5;
      }
      if(actualRank == "master"){
        rankNumbers = rankNumbers +6;
      }
      if(actualRank == "grandmaster"){
        rankNumbers = rankNumbers +7;
      }
      if(actualRank == "challenger"){
        rankNumbers = rankNumbers +8;
      }
    }
    console.log("Rank number", rankNumbers);
    actualRankNumber = Math.round(rankNumbers / teamArray.length) ;

    console.log("actualRank number:", actualRankNumber);

    if(actualRankNumber === 1){
      return 'iron';
    }
    if(actualRankNumber === 2){
      return 'bronze';
    }
    if(actualRankNumber === 3){
      return 'silver';
    }
    if(actualRankNumber === 4){
      return 'gold';
    }
    if(actualRankNumber === 5){
      return 'platinum';
    }
    if(actualRankNumber === 6){
      return 'master';
    }
    if(actualRankNumber === 7){
      return 'grandmaster';
    }
    if(actualRankNumber === 8){
      return 'challenger';
    }
  }

  getTeamMissingPlayersNumber(matchType,team){
    if(matchType === "duo"){
      return 2 - team.length;
    }
    if(matchType === "flex3"){
      return 3 - team.length;
    }
    if(matchType === "flex5"){
      return 5 - team.length;
    }
  }

  getAllPlayersFromList(){
    return this.af.object("/list").query.once('value');
  }

  getPlayersRoles(teamArray){
    let roles = [];
    for(let players of teamArray){
      roles.push(players.role);
    }
    return roles;
  }


  getAllPlayersWaiting(){
      return this.af.object("/waiting").query.once('value');
  }





}
