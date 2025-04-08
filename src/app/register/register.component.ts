import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule, NgIf, RouterLink, RouterLinkActive],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  email: string = '';
  errorMessage?: string;
  constructor(private authService: AuthService, public router: Router) {}

  register(): void {
    if (this.username && this.password && this.email) {
      const success = this.authService.register(this.username, this.password);

      if (success) {
        this.router.navigate(['/login']);
      } else {
        this.errorMessage = 'Registration failed. Please try again.';
      }
    } else {
      this.errorMessage = 'Please fill in all fields.';
    }
  }
}
