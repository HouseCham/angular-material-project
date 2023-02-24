import { Component } from '@angular/core';
import { ApiAuthService } from 'src/app/services/apiAuth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private _apiAuthService: ApiAuthService){

  }

  logout(){
    this._apiAuthService.logout();
  }
}
