import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = new BehaviorSubject<boolean>(this.getLoginState());
  isLogged$ = this.isLoggedIn.asObservable();

  login() {
    this.isLoggedIn.next(true);
  }

  logout() {
    this.isLoggedIn.next(false);
  }

  getLoginState(): boolean {
    const isLogged = localStorage.getItem('actualuser');
    return isLogged ? JSON.parse(isLogged) : false;
  }
}
