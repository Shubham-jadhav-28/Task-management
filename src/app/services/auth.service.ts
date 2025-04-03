import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USER_KEY = 'loggedInUser';
  private readonly TOKEN_KEY = 'authToken';
  private readonly USERNAME_KEY = 'username';

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: object) {}

  login(username: string, password: string): boolean {
    if (!isPlatformBrowser(this.platformId)) return false; // Ensure running in the browser
  
    const storedUser = localStorage.getItem(this.USER_KEY);
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.username === username && user.password === password) {
        localStorage.setItem(this.TOKEN_KEY, 'some-token'); // Mock token
        localStorage.setItem(this.USERNAME_KEY, username); // Store username
  
        // ✅ Ensure projects are not lost after login
        const storedProjects = localStorage.getItem('projectData');
        if (!storedProjects) {
          localStorage.setItem('projectData', JSON.stringify([])); // If no projects exist, create empty array
        }
  
        return true;
      }
    }
    return false;
  }
  

  register(username: string, password: string): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const user = { username, password };
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    
    // Automatically log in after registration
    localStorage.setItem(this.TOKEN_KEY, 'some-token');
    localStorage.setItem(this.USERNAME_KEY, username);
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
