import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-project-list',
  imports: [CommonModule,FormsModule,RouterOutlet],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent implements OnInit {
 
  projects: any[] = [];
  userProjects: any[] = [];
  selectedProject: any = null;
  username: string | null = null;
  isEditing: boolean = false;


  constructor(private router: Router,private cdr: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    const storedProjects = localStorage.getItem('projectData');
    const allProjects = storedProjects ? JSON.parse(storedProjects) : [];
  
    // Initialize the projects array
    this.projects = allProjects;
  
    if (this.username) {
      // Initialize the userProjects array based on the logged-in user
      this.userProjects = allProjects.filter(
        (project: any) =>
          project.createdBy &&
          project.createdBy.trim().toLowerCase() === this.username?.trim().toLowerCase()
      );
    }
  }
  
  
  editProject(project: any) {
    console.log('Editing project:', project);
    this.selectedProject = { ...project }; // Ensure a copy is made
    this.isEditing = true;
    console.log('Selected Project:', this.selectedProject);
  }
  
  updateProject() {
    console.log('Updating project:', this.selectedProject);
  
    const index = this.projects.findIndex((p: { id: any; }) => p.id === this.selectedProject.id);
    if (index !== -1) {
      this.projects[index] = { ...this.selectedProject };  // Update the project
      localStorage.setItem('projectData', JSON.stringify(this.projects));
  
      // Trigger change detection by reassigning the projects array to a new reference
      this.projects = [...this.projects]; // Create a new reference for Angular to detect
      this.userProjects = this.projects.filter((project: any) =>
        project.createdBy &&
        project.createdBy.trim().toLowerCase() === this.username?.trim().toLowerCase()
      );
      
      alert('Project updated successfully!');
    }
  
    this.isEditing = false; // Close the form after the update
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
  viewTaskDetails(project: any) {
    localStorage.setItem('selectedProject', JSON.stringify(project));  
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