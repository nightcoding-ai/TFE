import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { TeamsComponent } from './teams/teams.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {SidebarModule} from 'primeng/sidebar';
import {MenubarModule} from 'primeng/menubar';
import {AuthModule} from '@auth0/auth0-angular';

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
import { JwtModule} from '@auth0/angular-jwt';
import { CreateTeamFormComponent } from './teams/create-team-form/create-team-form.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSortModule} from '@angular/material/sort';
import { LeaveteamComponent } from './teams/leaveteam/leaveteam.component';
import { UpdateteamComponent } from './teams/updateteam/updateteam.component';
import { SearchplayerformComponent } from './teams/searchplayerform/searchplayerform.component';
import { DeleteteamformComponent } from './teams/deleteteamform/deleteteamform.component';
import { BanplayerComponent } from './teams/banplayer/banplayer.component';
import { JoinTeamFormComponent } from './teams/join-team-form/join-team-form.component';
import { InvitedPlayersComponent } from './teams/invited-players/invited-players.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';

import { SetascaptainComponent } from './teams/setascaptain/setascaptain.component';
import { JoinrequestlistComponent } from './teams/joinrequestlist/joinrequestlist.component';
import { AuthenticationService } from './auth/auth.service';
import { AuthInterceptorService } from './auth/authInterceptor.service';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { AdminPannelComponent } from './admin-pannel/admin-pannel.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ModifyProfileComponent } from './profile-player/modify-profile/modify-profile.component';


export function tokenGetter() {
  return localStorage.getItem("access_token");
}

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
    CreateTeamFormComponent,
    LeaveteamComponent,
    UpdateteamComponent,
    SearchplayerformComponent,
    BanplayerComponent,
    JoinTeamFormComponent,
    InvitedPlayersComponent,
    SetascaptainComponent,
    JoinrequestlistComponent,
    DeleteteamformComponent,
    AdminPannelComponent,
    ModifyProfileComponent

  ],
  entryComponents: [
    SearchplayerformComponent,
    LeaveteamComponent,
    UpdateteamComponent,
    DeleteteamformComponent, 
    SetascaptainComponent, 
    JoinrequestlistComponent, 
    JoinTeamFormComponent,
    ModifyProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:3000"],
        disallowedRoutes: []
      }
    }),
    NgbModule,
    FontAwesomeModule,
    SidebarModule,
    MenubarModule,
    ButtonModule,
    TableModule,
    NgbModule,
    AuthModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatTableModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatSortModule,
    MatPaginatorModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
