import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class ApiAuthService {
    private httpUrl: string = 'https://localhost:7127/api/User/login';

    constructor(private _http: HttpClient){
        
    }
}