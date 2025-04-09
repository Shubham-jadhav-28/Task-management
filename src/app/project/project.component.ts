import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../services/project.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-project',
  imports: [RouterLink, NgIf, FormsModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
  projects = {
    id:'',
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
  newProjectTitle: any;
 

  constructor(private router: Router, private projectService: ProjectService) { }
  ngOnInit() {
    const username = localStorage.getItem('username');
    if (username) {
      this.projects.createdBy = username;
    }
  }
  createProject(): void {
    let projects = JSON.parse(localStorage.getItem('projectData') || '[]');
    if (!Array.isArray(projects)) {
      projects = [];
    }
  
    const newProject = {
      id: Date.now().toString(),
      title: this.projects.title,
      description: this.projects.description,
      createdBy: this.projects.createdBy,
      manager: this.projects.manager,
      startDate: this.projects.startDate,
      endDate: this.projects.endDate,
      teamMembers: this.projects.teamMembers,
      dueDate: this.projects.dueDate,
      tasks: []
    };
  
    projects.push(newProject);
    localStorage.setItem('projectData', JSON.stringify(projects));
  
    console.log('Project Created:', newProject);
  
    
    Swal.fire({
      
      icon: 'success',
      title: 'Project Created Successfully!',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true
    });
  
   
    setTimeout(() => {
      this.router.navigate(['/project-list']);
    }, 1600); 
  }
  cancelProject() {
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
