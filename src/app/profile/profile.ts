import { Component } from '@angular/core';
import { CommonModule, LocationStrategy } from '@angular/common';
import { UserService } from '../services/user.service';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [FormsModule, CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {

     // TANSTACK QUERY
    usersQuery = injectQuery(() => ({ queryKey: ['users'], queryFn: () => this.userService.getUser()}));

   constructor(private location: LocationStrategy,  private userService: UserService){}

  goBack(){
    this.location.back()
  }

   
}
