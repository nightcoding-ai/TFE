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
import {MenuItem} from 'primeng/api';

import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';




@NgModule({
  declarations: [
    AppComponent,
    TeamsComponent,
    NavbarComponent
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
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
