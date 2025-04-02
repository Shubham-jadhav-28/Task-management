import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule,NgIf,RouterLink,RouterLinkActive]
})
export class LoginComponent {
  username: string = '';
  password:string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/project-list']);
    } else {
      alert('Invalid credentials');
    }
  }

  goToSignUp(): void {
    this.router.navigate(['/register']);
  }
  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }


 getUsername(): string | null {
  return this.authService.getUsername();
}
}
