import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule} from '@angular/common/http';
import { TeamsComponent } from './teams/teams.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {SidebarModule} from 'primeng/sidebar';
import {MenubarModule} from 'primeng/menubar';
import {AuthModule} from '@auth0/auth0-angular';
import { environment as env } from 'src/environments/environment';

import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import { TeamComponent } from './teams/team/team.component';
import { NewsComponent } from './news/news.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfilePlayerComponent } from './profile-player/profile-player.component';
import { MyTeamProfileComponent } from './teams/my-team-profile/my-team-profile.component';





@NgModule({
  declarations: [
    AppComponent,
    TeamsComponent,
    NavbarComponent,
    TeamComponent,
    NewsComponent,
    PagenotfoundComponent,
    SignupComponent,
    LoginComponent,
    ProfilePlayerComponent,
    MyTeamProfileComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FontAwesomeModule,
    SidebarModule,
    MenubarModule,
    ButtonModule,
    TableModule,
    NgbModule,
    AuthModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
