import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USER_KEY = 'loggedInUser';
  private readonly TOKEN_KEY = 'authToken';
  private readonly usernameKey = 'username';

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: object) {}

  login(username: string, password: string): boolean {
    if (!isPlatformBrowser(this.platformId)) return false; // Prevent error in non-browser environments

    const storedUser = localStorage.getItem(this.USER_KEY);
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.username === username && user.password === password) {
        localStorage.setItem(this.TOKEN_KEY, 'some-token'); // Mock token
        return true;
      }
    }

    return false;
  }

  register(username: string, password: string): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const user = { username, password };
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  isAuthenticated(): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  getUsername(): string | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    return localStorage.getItem(this.usernameKey);
  }

  logout(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login']);
  }
}
