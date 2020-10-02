import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddPlayerComponent} from './pages/add-player/add-player.component';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {WaitingComponent} from './pages/waiting/waiting.component';
import {SearchPlayerComponent} from './pages/search-player/search-player.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {GuideComponent} from './pages/guide/guide.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'addPlayer', component: AddPlayerComponent },
  { path: 'waiting', component: WaitingComponent },
  { path: 'search', component: SearchPlayerComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'guide', component: GuideComponent }


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
