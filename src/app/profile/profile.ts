import { Component } from '@angular/core';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {

   constructor(private location: LocationStrategy){}

  goBack(){
    this.location.back()
  }

   
}
