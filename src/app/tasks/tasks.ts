import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
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
  ],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css'
})
export class Tasks implements OnInit {

  listOfTasks: Task[] = [];
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
  }

  // Currently selected task
  selectedTask: Task | null = null;

  constructor(private taskService: TaskService, private cdr: ChangeDetectorRef
) {}

  ngOnInit(): void {
    this.getTasks();
  }

  // GET TASKS
  getTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (res) => {
        this.listOfTasks = res;
              this.cdr.detectChanges();

      },
      error: (err) => {
        console.error('Error fetching tasks', err);
      }
    });
  }

  //Add task
  addTask() {
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

  //Edit Task
    saveUpdatedTask():void{
      if(!this.selectedTask){
        return
      }
      //makes copy of the task before deleting
      const task = {...this.selectedTask}
      this.isEditTask = false;
      this.selectedTask = null;

      this.taskService.editTask(task).subscribe({
        next: (res)=> {
          console.log('Updated sucessfully', res)
          this.closeEditTask();
          this.getTasks();

        },
        error: (err)=>{
          console.error('Error updating', err)
          this.closeEditTask();
        }
      })

    }

    //Delete
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

      this.listOfTasks = this.listOfTasks.filter(
        task => task.id !== this.selectedTask?.id
      );

      this.closeDeleteTaskModal();
    },
    error: (err) => {
      console.error('Error deleting task', err);
    }
  });
}

  // ADD TASK
  openAddTask(): void {
    this.isAddTask = true;
    console.log('CLICKD')
  }

  closeAddTask(): void {
    this.isAddTask = false;
    console.log('CANCEL')
  }

  // ASSIGN TASK
  openAssignTask(): void {
    this.isAssignTask = true;
  }

  closeAssignTask(): void {
    this.isAssignTask = false;
  }

  // VIEW TASK
  viewTask(task: Task): void {
    this.selectedTask = task;
    this.isViewTask = true;
  }

  closeViewTask(): void {
    this.isViewTask = false;
    this.selectedTask = null;
  }

  // EDIT TASK
  editTask(task: Task): void {
    this.selectedTask = { ...task };
    this.isEditTask = true;
  }

  closeEditTask(): void {
    this.isEditTask = false;
    this.selectedTask = null;
  }

  // DELETE TASK
  deleteTask(task: Task): void {
    this.selectedTask = task;
    this.isDeleteTask = true;
  }


  closeDeleteTaskModal(): void {
    this.isDeleteTask = false;
    this.selectedTask = null;
  }

}