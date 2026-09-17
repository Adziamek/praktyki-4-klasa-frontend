import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment/environment';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private api = `${environment.apiUsers}`;
    
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.post(`${this.api}/login`, {
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

    isLoggedIn(): Observable<boolean> {
        const token = this.getToken();

        if (!token) {
            console.log('No token found');
            return of(false);
        }

        return this.http.get(`${this.api}/me`).pipe(
            map(() => true),
            catchError(() => {
                this.removeToken();
                return of(false);
            })
        )
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
        } catch(error) {
            console.error('JWT decode error:', error);
            return null;
        }
    }
}
