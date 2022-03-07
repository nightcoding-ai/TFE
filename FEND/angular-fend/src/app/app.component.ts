import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PrimeNGConfig} from 'primeng/api';
import { PrimeIcons } from 'primeng/api';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})





export class AppComponent {

  
  constructor(private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    
    this.primengConfig.ripple = true;

  }

  faUsers = faUser;
  
  
  


  


}
