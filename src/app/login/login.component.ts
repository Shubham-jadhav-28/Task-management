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
  userImageUrl: string = localStorage.getItem('userImage') || 'avtar.jpg'; 
 

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    if (this.authService.login(this.username, this.password)) {
      localStorage.setItem('username', this.username.trim());
      this.router.navigate(['/project-list']);
    } else {
      alert('Invalid credentials');
    }
  }

  logout(): void {
    this.authService.logout();
    // Here, we can make sure we update the UI by using `isLoggedIn()` after logout.
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
  // Handle image change (on file input change)
  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result as string;
        this.userImageUrl = imageUrl;
        localStorage.setItem('userImage', imageUrl); // Store the image URL in localStorage
      };
      reader.readAsDataURL(file); // Convert image to base64 URL
    }
  }

  removeImage(): void {
    this.userImageUrl = 'avtar.jpg'; // Set back to default image
    this.authService.setUserImage(this.userImageUrl);  // Update globally via AuthService
  }

}
