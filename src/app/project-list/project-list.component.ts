import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-project-list',
  imports: [CommonModule,FormsModule],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent implements OnInit {
  projects: any[] = [];
  selectedProject: any = null;
  isEditing: boolean = false;
  authService: any;
  newTask: any;
  username: string | null = null; 
  projectTasks: any[] = [];
  tasks: any[] = [];
  constructor(private router: Router) {}

  ngOnInit() {
    const storedProjects = localStorage.getItem('projectData');
 
      this.username = localStorage.getItem('username'); 
      console.log("Stored Username:", this.username);  
   
    if (storedProjects) {
      this.projects = JSON.parse(storedProjects);
      let user = this.projects.filter(x=>x.createdBy==this.username)
      console.log(user);
      
    } else {
      this.projects = [];
    }
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      try {
        this.tasks = JSON.parse(storedTasks);
      } catch (error) {
        console.error("Error parsing tasks data:", error);
        this.tasks = [];
      }
    } else {
      this.tasks = [];
    }
  
    // Filter tasks related to the selected project
    if (this.selectedProject && this.selectedProject.title) {
      this.projectTasks = this.tasks.filter(task => task.projectTitle === this.selectedProject.title);
      console.log("Tasks for Selected Project:", this.projectTasks);
    }
  }

 
  viewProjectDetails(project: any) {
    this.selectedProject = { ...project };
    
  }

  editProject() {
    if (!this.selectedProject) {
      console.error('No project selected!');
      return;
    }
    this.isEditing = true;
    console.log('Editing project:', this.selectedProject);
  }

 
  updateProject() {
    if (!this.selectedProject) return;

    const index = this.projects.findIndex((p) => p.title === this.selectedProject.title);
    if (index !== -1) {
      this.projects[index] = { ...this.selectedProject };
    }

    localStorage.setItem('projectData', JSON.stringify(this.projects));
    this.isEditing = false;
    this.selectedProject = null;
  }

  addTask() {
    if (!this.selectedProject) return;

    if (!this.newTask.title || !this.newTask.assignedTo) {
      alert('Task title and assigned person are required.');
      return;
    }

    this.selectedProject.tasks = this.selectedProject.tasks || [];
    this.selectedProject.tasks.push({ ...this.newTask });

    this.updateLocalStorage();
    this.newTask = { title: '', assignedTo: '', status: '' };
  }

  updateLocalStorage() {
    const index = this.projects.findIndex((p) => p.title === this.selectedProject.title);
    if (index !== -1) {
      this.projects[index] = this.selectedProject;
      localStorage.setItem('projectData', JSON.stringify(this.projects));
    }
  }
   
  deleteProject(project: any) {
    if (confirm(`Are you sure you want to delete "${project.title}"?`)) {
      this.projects = this.projects.filter((p) => p !== project);
      localStorage.setItem('projectData', JSON.stringify(this.projects));
    }
  }

  closeProjectDetails() {
    this.selectedProject = null;
    this.isEditing = false;
  }


  AddProject(): void {
    this.router.navigate(['/project']);
  }

  
  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('username'); 
  }

  getUsername(): string | null {
    return this.username;
  }

  
  AddTask() {
    this.router.navigate(['/task-list']);
  }
}