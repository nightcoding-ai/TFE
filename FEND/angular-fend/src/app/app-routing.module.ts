import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NewsComponent } from './news/news.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { TeamComponent } from './teams/team/team.component';
import { TeamsComponent } from './teams/teams.component';

const routes: Routes = [
  { path: 'news', component: NewsComponent},
  { path: '', redirectTo: '/news', pathMatch: 'full'},
  { path: 'teams', component: TeamsComponent},
  { path: 'teams/:id', component: TeamComponent},

  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

