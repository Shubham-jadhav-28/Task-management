import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-project-list',
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
})
export class ProjectListComponent implements OnInit {
  projects: any[] = [];
  userProjects: any[] = [];
  selectedProject: any = null;
  username: string | null = null;
  isEditing: boolean = false;
  searchQuery: string = '';
  sortField: string = '';
  filteredProjects: any[] = [];
  
  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    const storedProjects = localStorage.getItem('projectData');
    const allProjects = storedProjects ? JSON.parse(storedProjects) : [];

    this.projects = allProjects;

    if (this.username) {
      this.userProjects = allProjects.filter(
        (project: any) =>
          project.createdBy &&
          project.createdBy.trim().toLowerCase() ===
            this.username?.trim().toLowerCase()
      );
    }
    this.filteredProjects = this.userProjects;
  }

filterProjects() {
  const query = this.searchQuery.toLowerCase();

  this.filteredProjects = this.userProjects.filter(project =>
    project.title.toLowerCase().includes(query) ||
    project.manager.toLowerCase().includes(query)
  );
}

sortProjects() {
  if (!this.sortField) {
    this.filteredProjects = [...this.userProjects];
    return;
  }

  this.filteredProjects.sort((a, b) => {
    if (a[this.sortField] < b[this.sortField]) return -1;
    if (a[this.sortField] > b[this.sortField]) return 1;
    return 0;
  });
}
  editProject(project: any) {
    this.selectedProject = { ...project };
    this.isEditing = true;
  }

  updateProject() {
  const index = this.projects.findIndex(
    (p: any) => p.id === this.selectedProject.id
  );

  if (index !== -1) {
   
    this.projects[index] = { ...this.selectedProject };

 
    const userIndex = this.userProjects.findIndex(
      (p: any) => p.id === this.selectedProject.id
    );

    if (userIndex !== -1) {
      this.userProjects[userIndex] = { ...this.selectedProject };
    }

    
    localStorage.setItem('projectData', JSON.stringify(this.projects));
  }

  this.isEditing = false;
  this.selectedProject = null;
}


  cancelEdit() {
    this.isEditing = false;
    this.selectedProject = null;
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

  viewProjectDetails(project: any, index: number) {
    console.log('Navigating with project index:', index);
    this.router.navigate(['/project-details'], {
      state: { projectIndex: index },
    });
  }

  viewTaskDetails(project: any) {
    localStorage.setItem('selectedProject', JSON.stringify(project));
    this.router.navigate(['/task-details']);
  }

  closeProjectDetails() {
    this.selectedProject = null;
    this.isEditing = false;
  }

  viewDetail() {
    this.router.navigate(['/project-details']);
  }

  deleteProject(project: any): void {
    
      this.userProjects = this.userProjects.filter((p) => p !== project);

      const storedProjects = localStorage.getItem('projectData');
      const allProjects = storedProjects ? JSON.parse(storedProjects) : [];
      const updatedProjects = allProjects.filter(
        (p: any) => p.title !== project.title
      );

      localStorage.setItem('projectData', JSON.stringify(updatedProjects));
      this.filterProjects();
      
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('username');
  }

  getUsername(): string | null {
    return this.username;
  }
}
