import { Component, OnInit, ChangeDetectorRef, signal} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  // myTaskCount = 0;
  myTaskCount = signal(0);
  totalPendingTasks = signal(0);
  totalCompletedTasks = signal(0);

  constructor(private taskService:TaskService, private cdr: ChangeDetectorRef){};

  ngOnInit(){
    this.getMyTasks();
    this.getPendingTasks();
    this.getCompletedTasks();
  }

    getMyTasks(){
      this.taskService.getTasks().subscribe({
        next: (res) => {
          const myTasks = res.filter(
          task => task.assignedTo === 'Ama');
          this.myTaskCount.set(myTasks.length);
            this.cdr.detectChanges();
            
        },
        error: (err)=>{
          console.log('Error fetching tasks', err)
        }
      })
    }

      getPendingTasks(){
        this.taskService.getTasks().subscribe({
          next: (res)=> {
            const pendingTasks = res.reduce((count, task)=>{
               if(task.status === 'pending' && task.assignedTo === 'Ama'){
                count++
               } 
               return count;
            },0)

            this.totalPendingTasks.set(pendingTasks);
          }
        })
      }

    // getPendingTasks(){
    //   this.taskService.getTasks().subscribe({
    //     next: (res)=>{
    //       const pendingTasks = res.filter(
    //         task => task.status === 'pending' && task.assignedTo === 'Ama'
    //       );

    //       this.totalPendingTasks = pendingTasks.length;
    //       this.cdr.detectChanges();
    //     }
    //   })
    // }

    getCompletedTasks(){
      this.taskService.getTasks().subscribe({
        next: (res)=>{
          const completedTasks = res.filter(
            task => task.status === 'completed' && task.assignedTo === 'Ama'
          );

          this.totalCompletedTasks.set(completedTasks.length);
          this.cdr.detectChanges();
        }
      })
    }



}
