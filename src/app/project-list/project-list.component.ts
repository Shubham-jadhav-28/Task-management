import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-project-list',
  imports: [CommonModule,FormsModule,RouterOutlet],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent implements OnInit {
 
 
  userProjects: any[] = [];
  selectedProject: any = null;
  username: string | null = null;
  isEditing: boolean | undefined;

  constructor(private router: Router) {}

  ngOnInit(): void {
    
    this.username = localStorage.getItem('username');

    const storedProjects = localStorage.getItem('projectData');
    const allProjects = storedProjects ? JSON.parse(storedProjects) : [];

    if (this.username) {
      this.userProjects = allProjects.filter(
        (project: any) =>
          project.createdBy &&
          project.createdBy.trim().toLowerCase() === this.username?.trim().toLowerCase()
      );
    }
  }

  logout(): void {
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }


  AddProject(): void {
    this.router.navigate(['/project']);
  }

 
  AddTask(): void {
    this.router.navigate(['/task-list']);
  }

  viewProjectDetails(project: any) {
    this.router.navigate(['/project-details', project.id]);
    this.selectedProject = project; 
  }
  viewTaskDetails(task: any) {
    this.router.navigate(['/task-details']);
  }
  closeProjectDetails() {
    this.selectedProject = null; 
    this.isEditing = false;
  }
  viewDetail(){
    this.router.navigate(['/project-details']);
  }
  deleteProject(project: any): void {
    if (confirm(`Are you sure you want to delete "${project.title}"?`)) {
      
      this.userProjects = this.userProjects.filter((p) => p !== project);

      const storedProjects = localStorage.getItem('projectData');
      const allProjects = storedProjects ? JSON.parse(storedProjects) : [];
      const updatedProjects = allProjects.filter((p: any) => p.title !== project.title);

      localStorage.setItem('projectData', JSON.stringify(updatedProjects));
    }
  }


  isLoggedIn(): boolean {
    return !!localStorage.getItem('username');
  }

 
  getUsername(): string | null {
    return this.username;
  }
}