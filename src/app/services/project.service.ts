import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  getProjectById(_projectId: string): any {
    throw new Error('Method not implemented.');
  }
  private projects: any[] = []; // Store projects

  constructor() {}

  getProjects() {
    return JSON.parse(localStorage.getItem('projectData') || '[]');
  }

  addProject(project: any) {
    this.projects.push(project);
  }

  private selectedProject: any;

  setSelectedProject(project: any) {
    this.selectedProject = project;
  }

  getSelectedProject() {
    return this.selectedProject;
  }
  
}
