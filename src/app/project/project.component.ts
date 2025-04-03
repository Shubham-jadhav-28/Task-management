import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-project',
  imports: [RouterLink,NgIf,FormsModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
  projects = {
    title: '',
    description: '',
    createdBy: '',
    manager: '',
    startDate: '',
    endDate: '',
    teamMembers: '',
    dueDate: '',
    tasks: []
  };
  authService: any;

  constructor(private router: Router,private projectService: ProjectService) {} 
  createProject(): void {
    
    let projects = JSON.parse(localStorage.getItem('projectData') || '[]');
   if (!Array.isArray(projects)) {
    projects=[];
   }
  
    projects.push(this.projects);
  
    localStorage.setItem('projectData', JSON.stringify(projects));
  
    console.log('Project Created:', this.projects);
    alert('Project Created!');
  
   
    this.router.navigate(['/project-list']);
  }
  

  cancelProject(){
    this.router.navigate(['/project-list'])
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
