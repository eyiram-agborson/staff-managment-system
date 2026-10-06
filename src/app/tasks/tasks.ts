import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { DatePipe } from '@angular/common';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    FormsModule,
    NzTableModule,
    NzSelectModule
    // DatePipe
  ],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css'
})
export class Tasks implements OnInit {

  listOfTasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.taskService.getTasks().subscribe({
      next: (res) => {
        this.listOfTasks = res;
      },
      error: (err) => {
        console.error('Error fetching tasks', err);
      }
    });
  }
}