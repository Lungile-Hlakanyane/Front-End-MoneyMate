import { Component, OnInit } from '@angular/core';
import { AlertController, IonicModule, LoadingController, ModalController, } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { ViewImageModalComponent } from 'src/app/re-useable-components/view-image-modal/view-image-modal/view-image-modal.component';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/User-Service/user.service';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  standalone: true,
  imports:[IonicModule, FormsModule, CommonModule, ReactiveFormsModule]
})
export class EditProfileComponent  implements OnInit {
  userDetails: any;
  showPassword = false;
  newPassword: string = '';

  user: User = {
    id: 0,
    username: '',
    email: '',
    phoneNumber: '',
    password:''
  };

  constructor(
    private router:Router,
    private modal:ModalController,
    private alertController:AlertController,
    private actionSheetController:ActionSheetController,
    private toastController:ToastController,
    private loadingController:LoadingController,
    private toastControler:ToastController,
    private userService:UserService
  ) { }

  navigate(link:string){
    this.router.navigateByUrl(link)
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  ngOnInit() {
    const loggedInUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (loggedInUser?.email) {
      this.userService.getUserByEmail(loggedInUser.email).subscribe({
        next: (res) => {
          this.user = res;
        },
        error: (err) => {
          console.error('Failed to load user data:', err);
        }
      });
    }
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Choose an action',
      buttons: [
        {
          text: 'Upload Image',
          icon: 'eye-outline',
          handler: () => {
            console.log('Upload Image clicked');
            this.uploadImage();
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }

  uploadImage() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.click();
  
    fileInput.onchange = () => {
      const file = fileInput.files?.[0];
      if (file) {
        console.log('Selected image:', file);
      }
    };
  }

  async saveProfile() {
    const loading = await this.loadingController.create({
      message: 'Saving...',
      spinner: 'circular',
      duration: 2000
    });
    await loading.present();
  
    const updatedUser: User = {
      ...this.user, // assuming you store the current user in `this.user`
      password: this.newPassword || this.user.password, // only update if user typed a new one
      // optionally update other fields from inputs if you’re binding them
    };
  
    this.userService.updateUser(updatedUser).subscribe({
      next: async (response) => {
        await loading.dismiss();
        const toast = await this.toastController.create({
          message: 'Profile Saved Successfully...',
          position: 'top',
          duration: 2000,
          color: 'success',
        });
        await toast.present();
        localStorage.setItem('user', JSON.stringify(response)); // update local cache if needed
      },
      error: async (err) => {
        await loading.dismiss();
        const toast = await this.toastController.create({
          message: 'Failed to save profile.',
          position: 'top',
          duration: 2000,
          color: 'danger',
        });
        await toast.present();
        console.error('Update error:', err);
      }
    });
  }
  
  

  loadUser() {
    const user = this.userService.getLoggedInUser();
    if (user?.email) {
      this.userService.getUserByEmail(user.email).subscribe({
        next: (data) => this.userDetails = data,
        error: (err) => console.error('Error fetching user details:', err)
      });
    }
  }

  async togglePushNotifications(event: any) {
    if (event.detail.checked) {
      const toast = await this.toastController.create({
        message: 'Push Notifications activated...',
        duration: 2000,
        color: 'success',
        position: 'top'
      });
      toast.present();
    }
  }
  
  async toggleSmsNotifications(event: any) {
    if (event.detail.checked) {
      const toast = await this.toastController.create({
        message: 'SMS Notifications activated...',
        duration: 2000,
        color: 'success',
        position: 'top'
      });
      toast.present();
    }
  }

}
