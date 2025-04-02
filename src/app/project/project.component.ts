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
  projects: any[] = [];
  constructor(private router: Router) {} 
  createProject(): void {
    
    //  local storage
    console.log('Project Created:', this.project);
    alert('Project Created!');
   localStorage.setItem('projectData', JSON.stringify(this.project));

    
    this.router.navigate(['/project-list'])
     
  }

  logout(): void {
   
    localStorage.removeItem('user'); 
   
    this.router.navigate(['/login']);
  }
  
  
}
