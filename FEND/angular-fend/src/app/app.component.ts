import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PrimeNGConfig} from 'primeng/api';
import { PrimeIcons } from 'primeng/api';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})





export class AppComponent {

  
  constructor(public authService: AuthenticationService) { }

  ngOnInit(): void {
    

  }

  faUsers = faUser;
}
