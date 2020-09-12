import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { AddPlayerComponent } from './pages/add-player/add-player.component';
import { SearchPlayerComponent } from './pages/search-player/search-player.component';
import { AppRoutingModule } from './app-routing.module';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { WaitingComponent } from './pages/waiting/waiting.component';

import {AngularFireModule} from '@angular/fire';
import {AngularFireStorage, AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {MatTableModule} from '@angular/material/table';
import { TeamRoomComponent } from './component/team-room/team-room.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ProfileComponent } from './pages/profile/profile.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { CommentsComponent } from './pages/comments/comments.component';
import { GuideComponent } from './pages/guide/guide.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {SidenavService} from './services/sidenav.service';
import {MatDialogModule} from '@angular/material/dialog';



const firebaseConfig = {
  apiKey: "AIzaSyDOwuV7nFo_YR40hqXGdAqzIRYg_bVrlFA",
  authDomain: "lol-finder-1bb91.firebaseapp.com",
  databaseURL: "https://lol-finder-1bb91.firebaseio.com",
  projectId: "lol-finder-1bb91",
  storageBucket: "lol-finder-1bb91.appspot.com",
  messagingSenderId: "863137558450",
  appId: "1:863137558450:web:6c962fa70e521fac2cbeab",
  measurementId: "G-5SR9TNEZ6V"
};




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddPlayerComponent,
    SearchPlayerComponent,
    WaitingComponent,
    TeamRoomComponent,
    ProfileComponent,
    CommentsComponent,
    GuideComponent,
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatButtonModule,
        AppRoutingModule,
        MatCardModule,
        MatFormFieldModule,
        MatSelectModule,
        MatIconModule,
        MatInputModule,
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireAuthModule,
        AngularFireStorageModule,
        AngularFirestoreModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatExpansionModule,
        MatToolbarModule,
        MatGridListModule,
        MatSidenavModule,
        MatButtonToggleModule,
        MatDialogModule
    ],
  providers: [AddPlayerComponent, SidenavService],
  bootstrap: [AppComponent]
})
export class AppModule { }
