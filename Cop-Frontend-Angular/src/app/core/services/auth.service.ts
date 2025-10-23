import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private storageKey = 'basicAuthToken';

  login(username: string, password: string): boolean {
    if (!username || !password) return false;
    const token = btoa(`${username}:${password}`);
    localStorage.setItem(this.storageKey, token);
    return true;
  }

  logout(): void {
    localStorage.removeItem(this.storageKey);
  }

  get token(): string | null {
    return localStorage.getItem(this.storageKey);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }
}