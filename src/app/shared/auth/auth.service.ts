import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import { Login } from '../../model/Login';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private BASE_URL = 'http://localhost:8080/api/v1/login';
    private USER_KEY = 'auth-user';

    private isLoggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
    public isLoggedIn$ = this.isLoggedInSubject.asObservable();

    constructor(private http: HttpClient, private router: Router) { }

    login(userId: string, password: string): Observable<Login> {
        return this.http.post<Login>(`${this.BASE_URL}/validate`, { userId, password }).pipe(
            tap(user => {
                if (user) {
                    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
                    this.isLoggedInSubject.next(true);
                }
            })
        );
    }

    logout(): void {
        localStorage.removeItem(this.USER_KEY);
        this.isLoggedInSubject.next(false);
        this.router.navigate(['/login']);
    }

    isLoggedIn(): boolean {
        const user = localStorage.getItem(this.USER_KEY);
        return !!user;
    }

    getUser(): Login | null {
        const user = localStorage.getItem(this.USER_KEY);
        if (user) {
            return JSON.parse(user);
        }
        return null;
    }
}
