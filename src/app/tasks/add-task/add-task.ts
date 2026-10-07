import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';

import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [
    FormsModule,
    NzSelectModule,
    NzInputModule
  ],
  templateUrl: './add-task.html',
  styleUrl: './add-task.css'
})
export class AddTask {

  newTask: Task = {
    id: 0,
    title: '',
    description: '',
    assignedTo: '',
    priority: 'medium',
    status: 'pending',
    deadline: ''
  };

  constructor(
    private taskService: TaskService,
    private router: Router
  ) {}

  addTask(): void {
    this.taskService.addTask(this.newTask).subscribe({
      next: (res) => {
        console.log('Task added', res);
        this.router.navigate(['/tasks']);
      },
      error: (err) => {
        console.error('Error adding task', err);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/tasks']);
  }
}