import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { DatePipe } from '@angular/common';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDropdownModule } from 'ng-zorro-antd/dropdown';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzInputModule } from 'ng-zorro-antd/input';
import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    FormsModule,
    NzTableModule,
    NzSelectModule,
    NzModalModule,
    NzDropdownModule,
    NzMenuModule,
    NzInputModule
    // DatePipe
  ],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css'
})
export class Tasks implements OnInit {

  listOfTasks: Task[] = [];
  isAddTask = false;
  isAssignTask= false;
  
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

  openAddTask(): void {
  this.isAddTask = true;
  }

  openAssignTask(): void {
    this.isAssignTask = true;
  }

  closeAddTask(): void {
    this.isAddTask = false;
  }

  closeAssignTask(): void {
    this.isAssignTask = false;
  }

  viewTask(task: Task): void {
  console.log('View task:', task);
  }

  editTask(task: Task): void {
    console.log('Edit task:', task);
  }

  deleteTask(task: Task): void {
    console.log('Delete task:', task);
  }
}