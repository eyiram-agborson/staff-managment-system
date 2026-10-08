import { Component, OnInit } from '@angular/core';
import { CommonModule, LocationStrategy } from '@angular/common';
import { UserService } from '../services/user.service';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { FormsModule } from '@angular/forms';
import { User } from '../models/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [FormsModule, CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit{

  staffid: string | null = null;

  users: User[] = [];
  user: User | undefined;

   constructor(private location: LocationStrategy,  private userService: UserService, private route: ActivatedRoute){

   }

   ngOnInit(): void {
     this.passStaffId()
   }



  goBack(){
    const item = this.route.snapshot.queryParamMap.get('staffId')
    this.staffid = item

    this.location.back()
  }


  passStaffId(){
    this.staffid =
      this.route.snapshot.queryParamMap.get('staffId');

    this.users = JSON.parse(
      localStorage.getItem('users') || '[]'
    );
  
    this.user = this.users.find(
      user => String(user.id) === this.staffid
    );

    console.log('STAFF ID:', this.staffid);
    console.log('SELECTED USER:', this.user);
  }


// users: User[] = JSON.parse( localStorage.getItem('users') || '[]');

// user: User | undefined = this.users[0];

   
}

















// // Get users from localStorage
//     this.users = JSON.parse(
//       localStorage.getItem('users') || '[]'
//     );

//     console.log('RAW STORAGE:', localStorage.getItem('users'));
//     console.log('USERS:', this.users);
//     console.log('STAFF ID:', this.staffid);

//     // Find the user with the matching ID
//     this.user = this.users.find(
//       user => String(user.id) === this.staffid
//     );

//     console.log('STAFF ID:', this.staffid);
//     console.log('SELECTED USER:', this.user);
