import { Component, OnInit } from '@angular/core';
import { AlertController, IonicModule, LoadingController, ModalController, } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { ViewImageModalComponent } from 'src/app/re-useable-components/view-image-modal/view-image-modal/view-image-modal.component';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  standalone: true,
  imports:[IonicModule, FormsModule, CommonModule, ReactiveFormsModule]
})
export class EditProfileComponent  implements OnInit {
  
  showPassword = false;
  newPassword: string = '';

  constructor(
    private router:Router,
    private modal:ModalController,
    private alertController:AlertController,
    private actionSheetController:ActionSheetController,
    private toastController:ToastController,
    private loadingController:LoadingController,
    private toastControler:ToastController
  ) { }

  navigate(link:string){
    this.router.navigateByUrl(link)
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  ngOnInit() {}

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
    setTimeout(async () => {
      await loading.dismiss();
      const toast = await this.toastController.create({
        message: 'Profile Saved Successfully...',
        position:'top',
        duration: 2000,
        color: 'success',
      });
      await toast.present();
    }, 2000);
  }

}
