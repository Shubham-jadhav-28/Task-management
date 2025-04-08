import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly USERS_KEY = 'users';
  private readonly TOKEN_KEY = 'authToken';
  private readonly USERNAME_KEY = 'username';
  private readonly USER_IMAGE_KEY = 'userImage';

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  login(username: string, password: string): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;

    const storedUsers = localStorage.getItem(this.USERS_KEY);
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    const user = users.find(
      (u: any) => u.username === username && u.password === password
    );

    if (user) {
      localStorage.setItem(this.TOKEN_KEY, 'some-token');
      localStorage.setItem(this.USERNAME_KEY, username);
      console.log(`User ${username} logged in successfully.`);

      return true;
    }

    return false;
  }

  register(username: string, password: string): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;

    const storedUsers = localStorage.getItem(this.USERS_KEY);
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    if (users.some((user: any) => user.username === username)) {
      window.alert('User already exists. Please choose another username.');
      return false;
    }

    const newUser = { username, password };
    users.push(newUser);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));

    
    return true;
  }

  isAuthenticated(): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;
    return !!localStorage.getItem('username');
  }

  getUsername(): string {
    if (!isPlatformBrowser(this.platformId)) return 'Guest';
    return localStorage.getItem(this.USERNAME_KEY) || 'Guest';
  }

  getUserImage(): string {
    if (!isPlatformBrowser(this.platformId)) return 'assets/avtar.jpg';
    return localStorage.getItem(this.USER_IMAGE_KEY) || 'assets/avtar.jpg';
  }

  setUserImage(imageUrl: string): void {
    if (!isPlatformBrowser(this.platformId)) return;
    localStorage.setItem(this.USER_IMAGE_KEY, imageUrl);
  }

  logout(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USERNAME_KEY);
    localStorage.removeItem(this.USER_IMAGE_KEY);
    this.router.navigate(['/login']);
  }
}
