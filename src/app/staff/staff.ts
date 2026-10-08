import { Component, effect, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User, UserQuery } from '../models/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { signal } from '@angular/core';

import { injectQuery } from '@tanstack/angular-query-experimental';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { RoleService } from '../services/role.service';

@Component({
  selector: 'app-staff',
  imports: [CommonModule, FormsModule],
  templateUrl: './staff.html',
  styleUrl: './staff.css',
})
export class Staff implements OnInit {

  // new project
  isModalOpen = false
  deleteModal = false
  profileModal = false
  isFilterModal = false
  isAddStaffOpen = false
  searchQuery$ = new BehaviorSubject<string>('');
  searchQuery = ""
  user: User
  userQuery = new UserQuery();
 
  userData = signal<User[]>([]);

  selectedUserId: number | null = null;



    // TANSTACK QUERY
  usersQuery = injectQuery(() => ({ queryKey: ['users'], queryFn: () => this.userService.getUser() }));

 



    constructor(private router: Router, private userService: UserService,  private notification: NzNotificationService, private roleService: RoleService,) { 
      this.searchQuery$.pipe(debounceTime(500), distinctUntilChanged()).subscribe((value: string)=>{
        this.searchFunction(value)
      })

      this.user = new User
      // this.userQuery = new UserQuery

      //  effect(() => {
      //   const users = this.usersQuery.data();
      //   if (users) {
      //     localStorage.setItem('users', JSON.stringify(users));

      //     console.log('Users saved to localStorage:', users);
      //   }

      // });
     }



  ngOnInit(): void {
    this.filterUsers()
  }




// permission
editModalOpenWithPermission(): void {
  if (!this.roleService.isAdmin()) {
    this.notification.error(
      'Access Denied',
      'You do not have permission to edit users.'
    );
    return;
  }

  this.editModalOpen();
}

deleteModalOpenWithPermission(): void {
  if (!this.roleService.isAdmin()) {
    this.notification.error(
      'Access Denied',
      'You do not have permission to delete users.'
    );
    return;
  }

  this.deleteModalOpen();
}




// open TABLE modal
openModal1(userId: number) {
  this.isModalOpen = !this.isModalOpen;
  this.selectedUserId = userId;
}

closeModal1() {
  this.isModalOpen = false;
  this.selectedUserId = null;
}
 


  isEditModalOpen= false
  editModalOpen(){
    this.isEditModalOpen = true
  }

   closeModal(){
    this.isEditModalOpen = false
  }

  // DELETE MODAL
  deleteModalOpen(){
    this.deleteModal = true
  }

   closeDeleteModal(){
    this.deleteModal = false
  }


  // GO TO PROFILE
 goToProfile(id: number){
  this.router.navigateByUrl(`/profile?staffId=${id}`);
  console.log("Route ID", id)
 }


//  FILTER MODAL
 isfilterModalOpen(){
  this.isFilterModal = !this.isFilterModal
 }

 isfilterModalClose(){
  this.isFilterModal = false
 }


//  ADD STAFF MODAL
 isAddStaffModalOpen(){
  this.isAddStaffOpen = !this.isAddStaffOpen
 }

 isAddStaffModalClose(){
  this.isAddStaffOpen = false
 }





// FILTER
filterUsers(): void {
  const users = this.usersQuery.data() ?? [];

  const search = this.userQuery.search?.trim().toLowerCase() ?? '';
  const department = this.userQuery.department;
  const status = this.userQuery.status;

  this.userData.set( users.filter(user => {

      // SEARCH
      if (search) { const fullName = `${user.fname} ${user.lname}`.toLowerCase();

        const matchesSearch = fullName.includes(search) ||
          user.email.toLowerCase().includes(search) ||
          user.department.toLowerCase().includes(search) ||
          user.position.toLowerCase().includes(search);

        if (!matchesSearch) {
          return false;
        }
      }

      // DEPARTMENT
      if (department && user.department !== department) {
        return false;
      }

      // STATUS
      if (status && user.status !== status) {
        return false;
      }

      return true;
    })
  );

  console.log('FILTERED USERS:', this.userData());
}


// DEPARTMENT FILTER
filterFunction(filter: string): void {
  this.userQuery.department = filter;
  this.filterUsers();
}


// STATUS FILTER
filterStatus(status: string): void {
  this.userQuery.status = status;
  this.filterUsers();
}


// SEARCH FILTER
searchFunction(search: string): void {
  this.userQuery.search = search;
  this.filterUsers();
}

//  SEARCH QUERY
 giveToBehavior(){
  this.searchQuery$.next(this.searchQuery)
 }

}
