import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule,NgIf,RouterLink,RouterLinkActive]
})
export class LoginComponent {
  username: string = '';
  password:string = '';
  userImageUrl: string = localStorage.getItem('userImage') || 'avtar.jpg'; 
 

  constructor(private authService: AuthService, private router: Router) {}

 
login(): void {
  if (this.authService.login(this.username, this.password)) {
    localStorage.setItem('username', this.username.trim());
    Swal.fire({
     
      icon: 'success',
      title: 'Login successful!',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true
    });
    setTimeout(() => {
      this.router.navigate(['/project-list']);
    }, 1600); 
  } else {
 
    Swal.fire({
      icon: 'error',
      title: 'Invalid credentials',
      text: 'Please check your username and password.',
      confirmButtonColor: '#d33'
    });
  }
}
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
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
  
  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result as string;
        this.userImageUrl = imageUrl;
        localStorage.setItem('userImage', imageUrl); 
      };
      reader.readAsDataURL(file); 
    }
  }

  removeImage(): void {
    this.userImageUrl = 'avtar.jpg';
    this.authService.setUserImage(this.userImageUrl);  
  }

}
