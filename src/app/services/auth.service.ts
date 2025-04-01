import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USER_KEY = 'loggedInUser';
  private usernameKey = 'username';
  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    const storedUser = localStorage.getItem(this.USER_KEY);
    
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.username === username && user.password === password) {
        localStorage.setItem('authToken', 'some-token'); // Mock token
        return true;
      }
    }

    return false;
  }

  register(username: string, password: string): void {
    const user = { username, password };
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  getUsername(): string | null {
    return localStorage.getItem(this.usernameKey);
  }
  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}
