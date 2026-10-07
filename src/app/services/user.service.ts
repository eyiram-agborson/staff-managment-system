import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { Observable } from 'rxjs';
import { User, UserQuery } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient){}

  getUser(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.staffApi}`);
  }

  // getUser(item: User):Observable<User[]>{
  //   // let url = (`${environment.staffApi}`)
  //    let url = environment.staffApi;
  //   let isFirstParam = true

  //   if(item.search){
  //     // url += `${isFirstParam ? '?' : '&'}name_like=${item.search}`
  //     url += `?name_like=${encodeURIComponent(item.search.trim())}`;
  //     isFirstParam = false
  //   }

  //   return this.http.get<User[]>(url) 
  // }



// getUser(item: User): Observable<User[]> {
//   return this.http.get<User[]>(environment.staffApi);
// }

}
