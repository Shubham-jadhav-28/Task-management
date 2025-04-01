import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule,NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  email: String = ''
  errorMessage?: string; 
  constructor(private authService: AuthService, public router: Router) {}

  register(): void {
    if (this.username && this.password) {
      this.authService.register(this.username, this.password);
      this.router.navigate(['/login']);
    }else {
      this.errorMessage = 'Registration failed. Please try again.';
  }
}
}
