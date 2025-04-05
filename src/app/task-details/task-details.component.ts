import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-details',
  imports: [CommonModule,FormsModule],
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css'],
})
export class TaskDetailsComponent implements OnInit {
  projectTasks: any[] = [];
  selectedProject: any;
  allTasks: any[] = [];
  editingTaskIndex: number | null = null;
  editedTask: any = {};
  originalTask: any;
 
 

  constructor(private router: Router) {}

  ngOnInit(): void {
    const selected = localStorage.getItem('selectedProject');
    this.selectedProject = selected ? JSON.parse(selected) : null;
  
    const storedTasks = localStorage.getItem('tasks');
    const allTasks = storedTasks ? JSON.parse(storedTasks) : [];
  
    const username = localStorage.getItem('username'); 
  
    if (this.selectedProject && username) {
      const selectedTitle = this.selectedProject.title?.trim().toLowerCase();
      this.projectTasks = allTasks.filter(
        (task: any) =>
          task.projectTitle?.trim().toLowerCase() === selectedTitle &&
          task.createdBy?.trim().toLowerCase() === username.trim().toLowerCase()
      );
    }
  }
  

  filterProjectTasks(): void {
    if (this.selectedProject) {
      const selectedTitle = this.selectedProject.title?.trim().toLowerCase();
      this.projectTasks = this.allTasks.filter(
        (task: any) =>
          task.projectTitle?.trim().toLowerCase() === selectedTitle
      );
    }
  }
  editTask(index: number): void {
    this.editingTaskIndex = index;
    this.editedTask = { ...this.projectTasks[index] }; 
    this.originalTask = { ...this.projectTasks[index] };
     
  }

  saveTask(index: number): void {
    
    this.projectTasks[index] = { ...this.editedTask };
  
 
    const storedTasks = localStorage.getItem('tasks');
    this.allTasks = storedTasks ? JSON.parse(storedTasks) : [];
  
    
    const selectedTitle = this.selectedProject?.title?.trim().toLowerCase();
    
    const taskIndex = this.allTasks.findIndex(
      (task: any) =>
        task.projectTitle?.trim().toLowerCase() === selectedTitle &&
        task.title === this.editedTask.title ||
        (task.title === this.originalTask.title &&          
        task.description === this.originalTask.description)
    );
  
    if (taskIndex !== -1) {
    
      this.allTasks[taskIndex] = { ...this.editedTask };
      
    
      localStorage.setItem('tasks', JSON.stringify(this.allTasks));
    }
  
    
    this.projectTasks = this.allTasks.filter(
      (task: any) => task.projectTitle?.trim().toLowerCase() === selectedTitle 
     
    );
  

    this.cancelEdit();
  }
  
  cancelEdit(): void {
    this.editingTaskIndex = null;
    this.editedTask = {};
  }

  deleteTask(task: any): void {
    if (confirm(`Are you sure you want to delete "${task.title}"?`)) {
      
      this.projectTasks = this.projectTasks.filter((t) => t.title !== task.title);
  
      localStorage.setItem('tasks', JSON.stringify(this.projectTasks));
    }
  }
  
  closeProjectDetails() {
    this.router.navigate(['/project-list']); 
  }

  createTask(): void {
    this.router.navigate(['/task-list']);
  }
}