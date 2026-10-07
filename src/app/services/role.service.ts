import { Injectable } from '@angular/core';

export type UserRole = 'employee' | 'admin';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  // Mock current user for now
  private currentRole: UserRole = 'employee';
  private currentUser = 'Ama';

  getRole(): UserRole {
    return this.currentRole;
  }

  getCurrentUser(): string {
    return this.currentUser;
  }

  setRole(role: UserRole): void {
    this.currentRole = role;
  }

  setCurrentUser(name: string): void {
    this.currentUser = name;
  }

  isAdmin(): boolean {
    return this.currentRole === 'admin';
  }
}