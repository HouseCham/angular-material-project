import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { NavbarSection } from "../models/navbarSection";
import { Response } from "../models/response";

@Injectable({
    providedIn: 'root',
  })
export class NavbarService {
    private httpUrl: string = 'https://localhost:7127/api/Navbar';
    
    constructor(private _http: HttpClient){
        
    }

    getNavbarSections(): Observable<Response>{
        return this._http.get<Response>(`${this.httpUrl}/1`);   // 1 corresponde al id del proyecto, en este caso es para angular-material
    }
}