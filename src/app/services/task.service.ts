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

  addTask(task: Task): Observable<Task>{
    return this.http.post<Task>(environment.taskApi, task)
  }

  deleteTask(id:number | string): Observable<any>{
    const url = `${environment.taskApi}/${id}`
    return this.http.delete<any>(url)
  }

  editTask(task: Task): Observable<Task>{
    const url = `${environment.taskApi}/${task.id}`
    return this.http.put<Task>(url, task)
  }

  getTaskById(id: number): Observable<Task> {
    const url = `${environment.taskApi}/${id}`
  return this.http.get<Task>(url);
}

}
