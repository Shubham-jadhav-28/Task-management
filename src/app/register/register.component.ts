import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import Swal from 'sweetalert2';
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
        
        Swal.fire({
      
          icon: 'success',
          title: 'Registration successful!',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true
        });
  
       
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1600);
  
      } else {
        
        Swal.fire({
          icon: 'error',
          title: 'User Already Exists',
          text: 'A user with this username already exists. Please choose a different username.',
        });
      }
    } else {
     
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Fields',
        text: 'Please fill in all fields.'
      });
    }
  }
}
