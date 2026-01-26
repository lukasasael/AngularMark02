import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const AUTH_STORAGE_KEY = 'isLogged';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly loggedSubject = new BehaviorSubject<boolean>(false);
  isLogged$ = this.loggedSubject.asObservable();

  constructor() {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    const isLogged = stored === 'true';

    this.loggedSubject.next(isLogged);

    console.log('AuthService init → isLogged:', isLogged);
  }

  login() {
    localStorage.setItem(AUTH_STORAGE_KEY, 'true');
    this.loggedSubject.next(true);
  }

  logout() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    this.loggedSubject.next(false);
  }
}
