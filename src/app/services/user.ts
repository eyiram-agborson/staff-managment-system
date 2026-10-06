import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class User {

  constructor(private http: HttpClient){}

  getUser():Observable<any> {
    return this.http.get<any>('/api/user');
  }

}
