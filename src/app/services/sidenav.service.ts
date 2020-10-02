import { Injectable } from '@angular/core';
import {AppComponent} from '../app.component';
import {MatSidenav} from '@angular/material/sidenav';

@Injectable()
export class SidenavService {
  private sidenav: MatSidenav;

  public sidenavStatus;


  public setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }

  // tslint:disable-next-line:typedef
  public open() {
    return this.sidenav.open();
  }


  public close() {
    return this.sidenav.close();
  }

  public toggle1(): void {
    this.sidenav.toggle();
  }
}
