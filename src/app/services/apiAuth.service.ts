import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../models/user';
import { Response } from '../models/response';

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ApiAuthService {
  private httpUrl: string = 'https://localhost:7127/api/User/login';
  private usuarioSubject!: BehaviorSubject<any>;
  public user!: Observable<User>;

  constructor(private _http: HttpClient) {
    this.usuarioSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('userJWT') || '{}')
    );
    this.user = this.usuarioSubject.asObservable();
  }

  public get userData(): User {
    return this.usuarioSubject.value;
  }

  public login(email: string, password: string): Observable<Response> {
    let nombre: string = '';
    return this._http
      .post<Response>(this.httpUrl, { nombre, email, password }, httpOption)
      .pipe(
        map((result) => {
          console.log({ nombre, email, password });
          if (result.exito === 1) {
            const user: User = result.data;
            localStorage.setItem('userJWT', JSON.stringify(user));
            this.usuarioSubject.next(user); // everything that is suscribed to usuarioSubject observable, get the alert something changed
          }
          return result;
        })
      );
  }

  public logout() {
    localStorage.removeItem('userJWT');
    this.usuarioSubject.next(null);
  }
}
