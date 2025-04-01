import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-project',
  imports: [RouterLink,NgIf,FormsModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
  project = {
    title: '',
    description: '',
    createdBy: '',
    manager: '',
    startDate: '',
    endDate: '',
    teamMembers: '',
    dueDate: ''
  };
  authService: any;

  constructor(private router: Router) {} 
  createProject(): void {
    //  local storage
    console.log('Project Created:', this.project);
    alert('Project Created!');
      this.router.navigate(['/project/1/task-list']);
    
  }

  logout(): void {
   
    localStorage.removeItem('user'); 
    alert('Logged out successfully!');

    // Redirect to login page
    this.router.navigate(['/login']);
  }
  
}
