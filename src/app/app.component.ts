import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NgIf,FormsModule,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Task-management';
  constructor(private authService: AuthService, private router: Router) {}

  isLoginPage(): boolean {
    return this.router.url === '/login';
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
