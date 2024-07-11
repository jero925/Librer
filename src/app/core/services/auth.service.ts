import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { LoginResults, LoginForm } from '../interfaces/login';
import { RegisterForm, RegisterResults } from '../interfaces/register';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'token'

  constructor(private http: HttpClient) { }

  getToken = (): string | null => localStorage.getItem(this.tokenKey) || '';

  private isTokenExpired() {
    const token = this.getToken();
    if (!token) return true;
    const decoded = jwtDecode(token);
    const isTokenExpired = Date.now() >= decoded['exp']! * 1000;
    if (isTokenExpired) this.logout();
    return isTokenExpired;
  }

  login(data: LoginForm): Observable<LoginResults> {
    return this.http.post<LoginResults>(`${environment.notionURLBase}/login`, data)
    .pipe(map((res) => {
      if (res.exists) {
        localStorage.setItem(this.tokenKey, res.token);
      }
      return res;
    }))
  }

  isAuth(): boolean {
    const token = this.getToken();
    if (!token) return false;
    return !this.isTokenExpired();
  }

  register(data: RegisterForm): Observable<RegisterResults>{
    return this.http.post<RegisterResults>(`${environment.notionURLBase}/users`, data)
  }

  logout = (): void => {
    localStorage.removeItem(this.tokenKey);
  };

}
