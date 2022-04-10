import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { AdminPannelComponent } from './admin-pannel/admin-pannel.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NewsComponent } from './news/news.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ProfilePlayerComponent } from './profile-player/profile-player.component';
import { SignupComponent } from './signup/signup.component';
import { CreateTeamFormComponent } from './teams/create-team-form/create-team-form.component';
import { TeamComponent } from './teams/team/team.component';
import { TeamsComponent } from './teams/teams.component';
import { CreateTournamentFormComponent } from './tournament/create-tournament-form/create-tournament-form.component';
import { CurrentTournamentComponent } from './tournament/current-tournament/current-tournament.component';
import { TournamentComponent } from './tournament/tournament.component';

const routes: Routes = [
  { path: 'admin', component: AdminPannelComponent},
  { path: 'news', component: NewsComponent},
  { path: '', redirectTo: '/news', pathMatch: 'full'},
  { path: 'teams', component: TeamsComponent},
  { path: 'teams/:id', component: TeamComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'login', component: LoginComponent},
  { path: 'profile', component: ProfilePlayerComponent},
  { path: 'new_team', component: CreateTeamFormComponent},
  { path: 'tournaments', component: TournamentComponent},
  { path: 'tournaments/now', component: CurrentTournamentComponent},
  { path: 'tournaments/create', component: CreateTournamentFormComponent},
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

