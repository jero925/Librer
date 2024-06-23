import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { LoginResults } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<LoginResults> {
    return this.http.get<LoginResults>(`${environment.notionURLBase}/login?username=${username}&password=${password}`)
  }

  isAuth() {
    return localStorage.getItem('isAuth') ? true : false;
  }
}
