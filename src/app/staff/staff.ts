import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staff',
  imports: [],
  templateUrl: './staff.html',
  styleUrl: './staff.css',
})
export class Staff {


  constructor(private router: Router) { }

  
  // new project
  isModalOpen = false
  deleteModal = false
  profileModal = false
  isFilterModal = false
  isAddStaffOpen = false

  openModal1(){
    this.isModalOpen = !this.isModalOpen
  }

   closeModal1(){
    this.isModalOpen = false
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

 }

  

