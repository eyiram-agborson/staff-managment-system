import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

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

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.getTasks();
    this.listOfTasks;
  }

  // GET TASKS
  getTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (res) => {
        this.listOfTasks = res;
      },
      error: (err) => {
        console.error('Error fetching tasks', err);
      }
    });
  }

  //Add task
  addTask(){
    this.taskService.addTask(this.newTask).subscribe({
      next: (res)=>{
        console.log('Task added', res)
        this.listOfTasks.push(res)
        this.newTask = {
          id: 0,
          title: '',
          description: '',
          assignedTo: '',
          priority: 'medium',
          status: 'pending',
          deadline: ''
        }
      },
      error: (err)=>{
        console.error('Error adding task', err)
        this.isAddTask = false;
      }
    })
  }

  //Edit Task
    saveUpdatedTask():void{
      if(!this.selectedTask){
        return
      }
      this.taskService.editTask(this.selectedTask).subscribe({
        next: (res)=> {
          console.log('Updated sucessfully', res)
        },
        error: (err)=>{
          console.error('Error updating', err)
          this.isEditTask = false;
        }
      })

    }

  // ADD TASK
  openAddTask(): void {
    this.isAddTask = true;
  }

  closeAddTask(): void {
    this.isAddTask = false;
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

  confirmDeleteTask(): void {
    // API call will go here
  }

  closeDeleteTaskModal(): void {
    this.isDeleteTask = false;
    this.selectedTask = null;
  }

}