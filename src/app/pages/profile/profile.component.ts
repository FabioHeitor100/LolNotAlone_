import { Component, OnInit } from '@angular/core';
import {SidenavService} from '../../services/sidenav.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  sidenavStatus = false;
  constructor(private sidenav: SidenavService) { }

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

}
