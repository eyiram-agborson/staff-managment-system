import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDropdownModule } from 'ng-zorro-antd/dropdown';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';
import { RoleService } from '../services/role.service';

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
  ],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css'
})
export class Tasks implements OnInit {

  listOfTasks: Task[] = [];
  filteredTasks: Task[] = [];
  selectedStatus = '';
  selectedPriority = '';
  isAddTask = false;
  isAssignTask = false;
  isViewTask = false;
  isEditTask = false;
  isDeleteTask = false;
  newTask: Task = {
    id: 0,
    title: '',
    description: '',
    assignedTo: '',
    priority: 'medium',
    status: 'pending',
    deadline: ''
  };

  selectedTask: Task | null = null;

  constructor(
    private taskService: TaskService, private cdr: ChangeDetectorRef,
    private roleService: RoleService, private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.getTasks();
  }

  // GET TASKS
  getTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (res) => {
        this.listOfTasks = res;
        this.filteredTasks = res;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching tasks', err);
      }
    });
  }

  // FILTER TASKS
  filterTasks(): void {
    this.filteredTasks = this.listOfTasks.filter(task => {
      if (this.selectedStatus && task.status !== this.selectedStatus) {
        return false;
      }
      if (this.selectedPriority && task.priority !== this.selectedPriority) {
        return false;
      }
      return true;
    });
  }

  // ADD TASK
  openAddTask(): void {
    if (!this.roleService.isAdmin()) {
      this.notification.error(
        'Access Denied',
        'You do not have permission to add tasks.'
      );
      return;
    }

    this.isAddTask = true;
  }

  closeAddTask(): void {
    this.isAddTask = false;
  }

  addTask(): void {
    this.isAddTask = false;
    this.taskService.addTask(this.newTask).subscribe({
      next: (res) => {
        console.log('Task added', res);
        this.getTasks();

        this.newTask = {
          id: 0,
          title: '',
          description: '',
          assignedTo: '',
          priority: 'medium',
          status: 'pending',
          deadline: ''
        };
      },
      error: (err) => {
        console.error('Error adding task', err);
        this.isAddTask = true;
      }
    });
  }

  // ASSIGN TASK
  openAssignTask(): void {
    if (!this.roleService.isAdmin()) {
      this.notification.error(
        'Access Denied',
        'You do not have permission to assign tasks.'
      );
      return;
    }

    this.isAssignTask = true;
  }

  closeAssignTask(): void {
    this.isAssignTask = false;
  }

  // VIEW TASK
  viewTask(task: Task): void {

    if (!this.roleService.isAdmin() && task.assignedTo !== this.roleService.getCurrentUser()
    ) {
      this.notification.error(
        'Access Denied',
        'You can only view tasks assigned to you.'
      );
      return;
    }

    this.selectedTask = task;
    this.isViewTask = true;
  }

  closeViewTask(): void {
    this.isViewTask = false;
    this.selectedTask = null;
  }

  // EDIT TASK
  editTask(task: Task): void {
    if (!this.roleService.isAdmin()) {
      this.notification.error(
        'Access Denied',
        'You do not have permission to edit tasks.'
      );
      return;
    }

    this.selectedTask = { ...task };
    this.isEditTask = true;
  }

  closeEditTask(): void {
    this.isEditTask = false;
    this.selectedTask = null;
  }

  saveUpdatedTask(): void {
    if (!this.selectedTask) {
      return;
    }

    // Make a copy of the task
    const task = { ...this.selectedTask };
    this.isEditTask = false;
    this.selectedTask = null;

    this.taskService.editTask(task).subscribe({
      next: (res) => {
        console.log('Updated successfully', res);
        this.getTasks();
      },
      error: (err) => {
        console.error('Error updating', err);
      }
    });
  }

  // DELETE TASK
  deleteTask(task: Task): void {
    if (!this.roleService.isAdmin()) {
      this.notification.error(
        'Access Denied',
        'You do not have permission to delete tasks.'
      );
      return;
    }

    this.selectedTask = task;
    this.isDeleteTask = true;
  }

  closeDeleteTaskModal(): void {
    this.isDeleteTask = false;
    this.selectedTask = null;
  }

  confirmDeleteTask(): void {
    if (!this.selectedTask) {
      return;
    }
    const taskId = this.selectedTask.id;
    this.isDeleteTask = false;
    this.selectedTask = null;

    this.taskService.deleteTask(taskId).subscribe({
      next: (res) => {
        console.log('Task deleted', res);
        this.getTasks();
      },
      error: (err) => {
        console.error('Error deleting task', err);
      }
    });
  }
}