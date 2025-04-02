import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projects: any[] = []; // Store projects

  constructor() {}

  getProjects() {
    return this.projects;
  }

  addProject(project: any) {
    this.projects.push(project);
  }
}
