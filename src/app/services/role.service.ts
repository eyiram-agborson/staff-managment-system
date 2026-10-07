import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private currentUser = new BehaviorSubject<string>('Ama');

  getCurrentUser(): string {
    return this.currentUser.value;
  }

  getCurrentUser$(): Observable<string> {
    return this.currentUser.asObservable();
  }

  setCurrentUser(name: string): void {
    this.currentUser.next(name);
  }

  isAdmin(): boolean {
    return this.currentUser.value === 'Ama';
  }
}