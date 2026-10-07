import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User, UserQuery } from '../models/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { signal } from '@angular/core';

import { injectQuery } from '@tanstack/angular-query-experimental';

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



    // TANSTACK QUERY
  usersQuery = injectQuery(() => ({
    queryKey: ['users'],
    queryFn: () => this.userService.getUser()
  }));


    constructor(private router: Router, private userService: UserService) { 
      this.searchQuery$.pipe(debounceTime(500), distinctUntilChanged()).subscribe((value: string)=>{
        this.searchFunction(value)
      })

      this.user = new User
      this.userQuery = new UserQuery
     }



  ngOnInit(): void {
    this.filterUsers()
  }



  // openModal1(){
  //   this.isModalOpen = !this.isModalOpen
  // }

  //  closeModal1(){
  //   this.isModalOpen = false
  // }

selectedUserId: number | null = null;

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
 goToProfile(){
  this.router.navigate(['/profile']);
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




// fetchStaffData() {
//   this.userService.getUser().subscribe({
//     next: (res) => {

//       const search = this.userQuery.search.trim().toLowerCase();
//       const department = this.userQuery.department;
//       const status = this.userQuery.status;

//       const filteredUsers = res.filter(user => {

//         const fullName =
//           `${user.fname} ${user.lname}`.toLowerCase();

//         const matchesSearch =
//           !search ||
//           fullName.includes(search) ||
//           user.email.toLowerCase().includes(search) ||
//           user.department.toLowerCase().includes(search) ||
//           user.position.toLowerCase().includes(search);

//         const matchesDepartment =
//           !department ||
//           user.department === department;

//         const matchesStatus =
//           !status ||
//           user.status === status;

//         return (
//           matchesSearch &&
//           matchesDepartment &&
//           matchesStatus
//         );
//       });

//       this.userData.set(filteredUsers);
//     },

//     error: (err) => {
//       console.error('Error fetching users:', err);
//     }
//   });
// }


filterUsers() {
    // Get users from TanStack Query
    const users = this.usersQuery.data() ?? [];
    const search = this.userQuery.search?.trim().toLowerCase() ?? '';
    const department = this.userQuery.department;
    const status = this.userQuery.status;
    const filteredUsers = users.filter(user => {

      // Full name
      const fullName =
        `${user.fname} ${user.lname}`.toLowerCase();


      // SEARCH
      const matchesSearch =
        !search ||
        fullName.includes(search) ||
        user.email.toLowerCase().includes(search) ||
        user.department.toLowerCase().includes(search) ||
        user.position.toLowerCase().includes(search);

      // DEPARTMENT
      const matchesDepartment =
        !department ||
        user.department === department;

      // STATUS
      const matchesStatus =
        !status ||
        user.status === status;


      // ALL CONDITIONS MUST MATCH
      return (
        matchesSearch &&
        matchesDepartment &&
        matchesStatus
      );

    });

    // Update table data
    this.userData.set(filteredUsers);
    console.log('FILTERED USERS:', filteredUsers);
  }




//  SEARCH QUERY
 giveToBehavior(){
  this.searchQuery$.next(this.searchQuery)
 }

 searchFunction(search: string){
   console.log('SEARCH VALUE:', search);
  this.userQuery.search = search
  this.filterUsers()
 }


//  FILTER
filterFunction(filter: string){
  this.userQuery.department = filter
   this.filterUsers()
}

 }
  

