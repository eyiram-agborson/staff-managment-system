import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDropdownModule } from 'ng-zorro-antd/dropdown';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { Task } from '../models/task.model';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    FormsModule,
    NzTableModule,
    NzButtonModule,
    NzInputModule,
    NzDropdownModule,
    NzMenuModule,
    NzTagModule,
    NzSelectModule,
    NzIconModule,
    DatePipe
  ],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css'
})
export class Tasks {

  searchTerm = '';

  selectedStatus = '';
  selectedPriority = '';

  tasks: Task[] = [
    {
      id: 1,
      title: 'Update website',
      assignedTo: 'Ama',
      priority: 'High',
      deadline: '2026-10-10',
      status: 'In-Progress'
    },
    {
      id: 2,
      title: 'Prepare report',
      assignedTo: 'Kojo',
      priority: 'Medium',
      deadline: '2026-10-12',
      status: 'Pending'
    },
    {
      id: 3,
      title: 'Fix login bug',
      assignedTo: 'Ama',
      priority: 'High',
      deadline: '2026-10-08',
      status: 'Completed'
    },
    {
      id: 4,
      title: 'Review employee records',
      assignedTo: 'Yaw',
      priority: 'Low',
      deadline: '2026-10-15',
      status: 'Pending'
    },
    {
      id: 5,
      title: 'Create social media plan',
      assignedTo: 'Kojo',
      priority: 'Medium',
      deadline: '2026-10-18',
      status: 'In-Progress'
    },
    {
      id: 6,
      title: 'Update financial records',
      assignedTo: 'Ama',
      priority: 'High',
      deadline: '2026-10-20',
      status: 'Pending'
    }
  ];

  get filteredTasks(): Task[] {
    return this.tasks.filter(task => {

      const search = this.searchTerm.toLowerCase().trim();

      const matchesSearch =
        !search ||
        task.title.toLowerCase().includes(search) ||
        task.assignedTo.toLowerCase().includes(search);

      const matchesStatus =
        !this.selectedStatus ||
        task.status === this.selectedStatus;

      const matchesPriority =
        !this.selectedPriority ||
        task.priority === this.selectedPriority;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }

  getPriorityColor(priority: string): string {
    switch (priority) {
      case 'High':
        return 'red';

      case 'Medium':
        return 'orange';

      case 'Low':
        return 'green';

      default:
        return 'default';
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Completed':
        return 'green';

      case 'In Progress':
        return 'blue';

      case 'Pending':
        return 'gold';

      default:
        return 'default';
    }
  }

  editTask(task: Task): void {
    console.log('Edit task:', task);
  }

  deleteTask(task: Task): void {
    console.log('Delete task:', task);
  }

  addTask(): void {
    console.log('Add task');
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedStatus = '';
    this.selectedPriority = '';
  }
}