import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  // Replace current user with Kojo if you want to test for normal user
  private currentUser = 'Ama';
  // private currentUser = 'Kojo';

  getCurrentUser(): string {
    return this.currentUser;
  }

  setCurrentUser(name: string): void {
    this.currentUser = name;
  }

  isAdmin(): boolean {
    return this.currentUser === 'Ama';
  }
}