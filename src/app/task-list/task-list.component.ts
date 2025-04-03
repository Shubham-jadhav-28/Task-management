import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  imports: [NgFor, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent {
  task = {
    title: '',
    assignedTo: '',
    status: 'Medium',
    assignedUser: '',
    estimate: 0,
    timeSpent: 0,
  };

  constructor(private router: Router) {}
  createTask(): void {
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.push(this.task);
    this.router.navigate(['/project-list']);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    console.log('Task Created:', this.task);
    alert('Task Created!');
  }

  cancelTask() {
    this.router.navigate(['/project-list']);
  }
}
