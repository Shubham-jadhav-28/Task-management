import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-project-list',
  imports: [],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent {
  project: any = null;
  authService: any;
  
  constructor(private router: Router) {}

  createProject(): void {
    this.router.navigate(['/project']);

  }
  
  logout(): void {
   
    localStorage.removeItem('user'); 
   
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }


 getUsername(): string | null {
  return this.authService.getUsername();
}
}
