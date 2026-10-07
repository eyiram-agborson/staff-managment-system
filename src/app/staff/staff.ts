import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User, UserQuery } from '../models/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { signal } from '@angular/core';

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
  searchQuery$ = new Subject<string>()
  searchQuery = ""
  user: User
  // userQuery: UserQuery
  userQuery = new UserQuery();
 

  // userData: User[] = []
  userData = signal<User[]>([]);


    constructor(private router: Router, private userService: UserService) { 
      this.searchQuery$.pipe(debounceTime(500), distinctUntilChanged()).subscribe((value: string)=>{
        this.searchFunction(value)
      })

      this.user = new User
      this.userQuery = new UserQuery
     }



  ngOnInit(): void {
    this.fetchStaffData()
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

// API CALL
//  fetchStaffData(){
//   this.userService.getUser(this.user).subscribe({
//     next: (res)=>{
//       console.log("User API data",res)
//       // this.userData = res;
//       this.userData.set(res);
//       console.log("User data",this.userData())
//     },
//     error: (err)=>{
//       console.log("Error fetching user data",err)
//     },
//     complete: ()=>{
//       console.log("User data fetch complete")
//     }
//   })
//  }

fetchStaffData() {
  this.userService.getUser().subscribe({
    next: (res) => {

      console.log('ALL API USERS:', res);

      const search = this.userQuery.search.trim().toLowerCase();

      const filteredUsers = search
        ? res.filter(user => {
            const fullName = `${user.fname} ${user.lname}`.toLowerCase();

            return (
              fullName.includes(search) ||
              user.email.toLowerCase().includes(search) ||
              user.department.toLowerCase().includes(search) ||
              user.position.toLowerCase().includes(search)
            );
          })
        : res;

      console.log('SEARCH:', search);
      console.log('FILTERED USERS:', filteredUsers);

      this.userData.set(filteredUsers);
    },

    error: (err) => {
      console.error('Error fetching users:', err);
    }
  });
}

//  SEARCH QUERY
 giveToBehavior(){
  this.searchQuery$.next(this.searchQuery)
 }

 searchFunction(search: string){
   console.log('SEARCH VALUE:', search);
  this.userQuery.search = search
  this.fetchStaffData()
 }

 }
  

