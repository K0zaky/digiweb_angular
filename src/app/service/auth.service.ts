import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './userapi.service';
import { map } from 'rxjs/operators';


interface User {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authToken: string | null = null;
  private loggedInSubject: BehaviorSubject<boolean>;

  constructor(private apiService: ApiService) {
    this.loggedInSubject = new BehaviorSubject<boolean>(false);
    this.checkAuthStatus();
  }

  login(username: string, password: string): Observable<boolean> {
    return this.apiService.getData().pipe(
      map((users: User[]) => {
        const validUser = users.find(user => user.username === username && user.password === password);
        if (validUser) {
          this.authToken = 'token_de_prueba';
          this.loggedInSubject.next(true);
          localStorage.setItem('authToken', this.authToken);
          return true;
        } else {
          return false;
        }
      })
    );
  }

  logout(): void {
    this.authToken = null;
    this.loggedInSubject.next(false);
    localStorage.removeItem('authToken');
  }

  isLoggedIn(): boolean {
    return !!this.authToken;
  }

  getLoggedIn(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }

  private checkAuthStatus(): void {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      this.authToken = storedToken;
      this.loggedInSubject.next(true);
    }
  }
}
