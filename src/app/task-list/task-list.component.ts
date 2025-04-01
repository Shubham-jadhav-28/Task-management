import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  imports: [NgFor,FormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  task = {
    title: '',
    assignedTo: '',
    status: 'Medium',
    assignedUser: '',
    estimate: 0,
    timeSpent: 0
  };

  createTask(): void {
  
    console.log('Task Created:', this.task);
    alert('Task Created!');
  }
}
