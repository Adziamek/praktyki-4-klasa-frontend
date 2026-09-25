import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment/environment';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Roles } from '../../environments/role/roles';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api = `${environment.apiUsers}`;
  private role = signal<string | null>(null);

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.api}/login`, {
      username,
      password
    });
  }

  signup(username: string, password: string, email: string) {
    return this.http.post(`${this.api}/signup`, {
      username,
      password,
      email
    });
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  removeToken() {
    localStorage.removeItem('token');
  }

  getUserRole(): Observable<string | null> {
    const token = this.getToken();

    if (!token) {
      console.log('No token found');
      return of(null);
    }

    return this.http.get<{ role: string }>(`${this.api}/me`).pipe(
      map(user => {
        this.role.set(user.role);
        return user.role;
      }),
      catchError(() => {
        this.removeToken();
        return of(null);
      })
    );
  }

  isUser(): boolean {
    return this.role() === Roles.User;
  }

  isWarehouseman(): boolean {
    return this.role() === Roles.Warehouseman;
  }

  isAdministrator(): boolean {
    return this.role() === Roles.Administrator;
  }

  getUsername(): string | null {
    const token = this.getToken();

    if (!token) {
      console.log('No token found');
      return null;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));

      return payload.username ?? null;
    } catch (error) {
      console.error('JWT decode error:', error);
      return null;
    }
  }
}
