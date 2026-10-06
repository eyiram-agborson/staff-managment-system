import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {

  constructor (private http: HttpClient, private taskService: TaskService){}

  getTasks(): Observable<Task[]>{
    return this.get<Task[]>(environment.taskApi)
  }
}
