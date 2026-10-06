import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { environment } from '../environment';


@Injectable({
  providedIn: 'root',
})
export class TaskService {

  constructor (private http: HttpClient){}

  getTasks(): Observable<Task[]>{
    return this.http.get<Task[]>(environment.taskApi)
  }
}
