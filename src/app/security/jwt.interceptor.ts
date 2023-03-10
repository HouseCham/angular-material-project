import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiAuthService } from "../services/apiAuth.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor{
    constructor(private apiAuthService: ApiAuthService){

    }
    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        const user = this.apiAuthService.userData;
        if(user && Object.keys(user).length != 0 && user != null){
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${user.token}`
                }
            });
        }
        return next.handle(request);
    }
}