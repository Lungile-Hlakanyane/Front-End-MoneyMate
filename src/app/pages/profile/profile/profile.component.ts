import { Component, OnInit } from '@angular/core';
import { AlertController, IonicModule, LoadingController, ModalController, } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { ViewImageModalComponent } from 'src/app/re-useable-components/view-image-modal/view-image-modal/view-image-modal.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports:[IonicModule, FormsModule, CommonModule, ReactiveFormsModule]
})
export class ProfileComponent  implements OnInit {

  constructor(
    private router:Router,
    private actionSheetController:ActionSheetController,
    private modal:ModalController,
    private alertController:AlertController,
    private loadingController:LoadingController
  ) { }

  ngOnInit() {}

  navigate(link:string){
    this.router.navigateByUrl(link)
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Choose an action',
      buttons: [
        {
          text: 'View Image',
          icon: 'eye-outline',
          handler: () => {
            console.log('Upload Image clicked');
            this.viewImage();
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

  async viewImage() {
   const modal = await this.modal.create({
    component:ViewImageModalComponent,
    cssClass:'bottom-modal',
    backdropDismiss:true,
    componentProps: {},
   });
   await modal.present();
  }

  async logout() {
    const alert = await this.alertController.create({
      header: 'Confirm Logout',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Logout canceled');
          }
        },
        {
          text: 'Yes',
          handler: async () => {
            const loading = await this.loadingController.create({
              message: 'Logging out...',
              duration: 2000, 
              spinner: 'circular',
            });
            await loading.present();
            setTimeout(() => {
              loading.dismiss();
              this.router.navigateByUrl('/login');
            }, 2000);
          }
        }
      ]
    });
  
    await alert.present();
  }

}
