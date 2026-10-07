import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDropdownModule } from 'ng-zorro-antd/dropdown';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzInputModule } from 'ng-zorro-antd/input';
import { Router } from '@angular/router';
import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
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
  selectedStatus= '';
  selectedPriority= '';
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

  constructor(private taskService: TaskService, 
    private cdr: ChangeDetectorRef, 
    private router: Router,
      private roleService: RoleService,
  private notification: NzNotificationService
) {}

  ngOnInit(): void {
    this.getTasks();
  }

  goToAdminTasks(): void {
    this.router.navigate(['/tasks/admin']);
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

//Filter Tasks
  filterTasks(){
    this.filteredTasks = this.listOfTasks.filter(task=>{
      if(this.selectedStatus && task.status !== this.selectedStatus){
        return false;
      }
      if(this.selectedPriority && task.priority !== this.selectedPriority){
        return false;
      }
      return true;
    })
      
      
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
    console.log('CANCEL')
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
    if (!this.roleService.isAdmin() && task.assignedTo === 'Ama') {
    this.notification.error(
      'Access Denied',
      'You do not have permission to view this task.'
    );
    return;
  }
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
      'You do not have permission to assign tasks.'
    );
    return;
  }

  this.isEditTask = true;
  }

  closeEditTask(): void {
    this.isEditTask = false;
    this.selectedTask = null;
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
    this.isDeleteTask = true;
  }


  closeDeleteTaskModal(): void {
    this.isDeleteTask = false;
    this.selectedTask = null;
  }

}