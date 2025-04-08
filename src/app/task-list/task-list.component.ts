import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';  
@Component({
  selector: 'app-task-list',
  imports: [NgFor, FormsModule, NgIf, RouterOutlet],
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
    projectTitle: '',
    projectId: '',
    createdBy: '',
  };

  constructor(private router: Router) {}
  createTask(): void {
    const selectedProject = JSON.parse(
      localStorage.getItem('selectedProject') || '{}'
    );
    const username = localStorage.getItem('username');

    this.task.projectTitle = selectedProject.title;
    this.task.projectId = selectedProject.id;
    this.task.createdBy = username || 'Unknown User';

    const storedTasks = localStorage.getItem('tasks');
    let tasks = storedTasks ? JSON.parse(storedTasks) : [];

    tasks.push(this.task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    Swal.fire({
      icon: 'success',
      title: 'Task Created!',
      text: 'Your task has been successfully created.',
      timer: 2000, // auto-close after 2 seconds
      showConfirmButton: false
    }).then(() => {
      // After the popup closes, navigate to task details
      this.router.navigate(['/task-details']);
    });
  }

  cancelTask() {
    this.router.navigate(['/project-list']);
  }
}
