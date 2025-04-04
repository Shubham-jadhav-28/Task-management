import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USERS_KEY = 'users';
  private readonly TOKEN_KEY = 'authToken';
  private readonly USERNAME_KEY = 'username';

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: object) { }

  login(username: string, password: string): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;

    const storedUsers = localStorage.getItem(this.USERS_KEY);
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    const user = users.find((u: any) => u.username === username && u.password === password);

    if (user) {
      localStorage.setItem(this.TOKEN_KEY, 'some-token');
      localStorage.setItem(this.USERNAME_KEY, username);
      console.log(`User ${username} logged in successfully.`);

      return true;
    }

    return false;
  }

  register(username: string, password: string): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const storedUsers = localStorage.getItem(this.USERS_KEY);
    const users = storedUsers ? JSON.parse(storedUsers) : [];


    if (users.some((user: any) => user.username === username)) {
      alert('User already exists. Please choose another username.');
      return;
    }

    const newUser = { username, password };
    users.push(newUser);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));


    localStorage.setItem(this.TOKEN_KEY, 'some-token');
    localStorage.setItem(this.USERNAME_KEY, username);

    console.log(`User ${username} registered and logged in.`);
  }

  isAuthenticated(): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  getUsername(): string {
    if (!isPlatformBrowser(this.platformId)) return 'Guest';
    return localStorage.getItem(this.USERNAME_KEY) || 'Guest';
  }

  logout(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USERNAME_KEY);
    this.router.navigate(['/login']);
  }
}
