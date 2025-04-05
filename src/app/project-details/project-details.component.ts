import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { log } from 'console';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule, FormsModule,NgFor,NgIf],
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  projects: any[] = [];
  selectedProject: any = null;
  isEditing: boolean = false;
  username: string | null = null;
  projectTasks: any[] = [];
  tasks: any[] = [];
  userProjects: any[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.username = localStorage.getItem('username');
   
    const projectId = this.route.snapshot.paramMap.get('id');
    const storedProjects = localStorage.getItem('projectData');
    this.projects = storedProjects ? JSON.parse(storedProjects) : [];
  
    this.selectedProject = this.projects.find(p => p.id == projectId);
  
    const storedTasks = localStorage.getItem('tasks');
    this.tasks = storedTasks ? JSON.parse(storedTasks) : [];
  
    if (this.selectedProject && this.username) {
      const selectedTitle = this.selectedProject.title.trim().toLowerCase();
  
      this.projectTasks = this.tasks.filter(task =>
        task.projectTitle?.trim().toLowerCase() === selectedTitle &&
        task.createdBy === this.username
      );
  
      console.log('Filtered projectTasks:', this.projectTasks);
    }
    
    
  }
  

  closeProjectDetails() {
    this.router.navigate(['/project-list']); 
  }

  AddProject(): void {
    this.router.navigate(['/project']);
  }

  logout(): void {
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('username');
  }

  getUsername(): string | null {
    return this.username;
  }

  AddTask() {
    localStorage.setItem('selectedProject', JSON.stringify(this.selectedProject));
    this.router.navigate(['/task-list']);
  }
  
  viewProjectTasks(project: any) {
    localStorage.setItem('selectedProject', JSON.stringify(project));
    this.router.navigate(['/task-details']);
  }
  
}
