import { Component, OnInit } from '@angular/core';
import { NavbarSection } from 'src/app/models/navbarSection';
import { ApiAuthService } from 'src/app/services/apiAuth.service';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public navbar: NavbarSection[] = [];
  constructor(private _apiAuthService: ApiAuthService, private _navbarService: NavbarService){

  }

  ngOnInit(): void {
    this.getNavbarSections();
  }

  logout(){
    this._apiAuthService.logout();
  }

  getNavbarSections(){
    this._navbarService.getNavbarSections().subscribe(response => {
      if(response.exito === 1){
        this.navbar = response.data;
      }
    });
  }
}
