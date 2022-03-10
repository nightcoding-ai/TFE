import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NewsComponent } from './news/news.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ProfilePlayerComponent } from './profile-player/profile-player.component';
import { SignupComponent } from './signup/signup.component';
import { CreateTeamFormComponent } from './teams/create-team-form/create-team-form.component';
import { TeamComponent } from './teams/team/team.component';
import { TeamsComponent } from './teams/teams.component';

const routes: Routes = [
  { path: 'news', component: NewsComponent},
  { path: '', redirectTo: '/news', pathMatch: 'full'},
  { path: 'teams', component: TeamsComponent},
  { path: 'teams/:id', component: TeamComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'login', component: LoginComponent},
  { path: 'profile', component: ProfilePlayerComponent},
  { path: 'new_team', component: CreateTeamFormComponent},



  
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

