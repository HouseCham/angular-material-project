import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { ApiAuthService } from "../services/apiAuth.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    
    constructor(private route: Router, private apiAuthService: ApiAuthService){}

    canActivate(route: ActivatedRouteSnapshot): boolean{
        const user = this.apiAuthService.userData;
        if (user && Object.keys(user).length != 0 && user != null){
            return true;
        }
        this.route.navigate(['/login']);
        return false;
    }
}