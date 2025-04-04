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

  constructor(private router: Router) {}

  ngOnInit(): void {
 
    const selected = localStorage.getItem('selectedProject');
    this.selectedProject = selected ? JSON.parse(selected) : null;

 
    const storedTasks = localStorage.getItem('tasks');
    const allTasks = storedTasks ? JSON.parse(storedTasks) : [];

    
    if (this.selectedProject) {
      const selectedTitle = this.selectedProject.title?.trim().toLowerCase();
      this.projectTasks = allTasks.filter(
        (task: any) =>
          task.projectTitle?.trim().toLowerCase() === selectedTitle
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
  }

  saveTask(index: number): void {
    this.projectTasks[index] = { ...this.editedTask };

    const taskIndex = this.allTasks.findIndex(
      (t) => t.title === this.editedTask.title
    );

    if (taskIndex !== -1) {
      this.allTasks[taskIndex] = { ...this.editedTask };
      localStorage.setItem('tasks', JSON.stringify(this.allTasks));
    }

    this.cancelEdit();
  }

  cancelEdit(): void {
    this.editingTaskIndex = null;
    this.editedTask = {};
  }

  deleteTask(task: any): void {
    if (confirm(`Are you sure you want to delete "${task.title}"?`)) {
      this.allTasks = this.allTasks.filter((t) => t.title !== task.id);
      localStorage.setItem('tasks', JSON.stringify(this.allTasks));
      this.filterProjectTasks();
    }
  }
  closeProjectDetails() {
    this.router.navigate(['/project-list']); 
  }
}