import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { LoginResults } from '../interfaces/login';
import { RegisterForm, RegisterResults } from '../interfaces/register';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<LoginResults> {
    return this.http.get<LoginResults>(`${environment.notionURLBase}/login?username=${username}&password=${password}`)
  }

  isAuth(): boolean {
    return localStorage.getItem('isAuth') ? true : false;
  }

  register(data: RegisterForm): Observable<RegisterResults>{
    return this.http.post<RegisterResults>(`${environment.notionURLBase}/users`, data)
  }

}
