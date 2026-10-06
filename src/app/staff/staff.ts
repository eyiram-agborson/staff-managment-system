import { Component } from '@angular/core';

@Component({
  selector: 'app-staff',
  imports: [],
  templateUrl: './staff.html',
  styleUrl: './staff.css',
})
export class Staff {

  
  // new project
  isModalOpen = false
  deleteModal = false
  profileModal = false

  openModal1(){
    this.isModalOpen = !this.isModalOpen
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


   // PROFILE MODAL
  profileModalOpen(){
    this.profileModal = true
  }

   closeProfileModal(){
    this.profileModal = false
  }

  
}
