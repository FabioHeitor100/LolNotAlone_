import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {SidenavService} from './services/sidenav.service';
import {MatSidenav} from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  title = 'LolFinder';
  sidenavOpen: boolean;

  @ViewChild('sidenav') public sidenav: MatSidenav;


  constructor(public sidenavService: SidenavService) {
  }

  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }
}
