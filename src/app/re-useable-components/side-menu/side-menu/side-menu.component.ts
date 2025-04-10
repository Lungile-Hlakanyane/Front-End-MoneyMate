import { Component, OnInit } from '@angular/core';
import { IonList } from "@ionic/angular/standalone";
import { Router } from '@angular/router';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SideMenuComponent  implements OnInit {

  role: string = '';

  constructor(
    private modalController:ModalController,
    private loadingController:LoadingController,
    private alertController:AlertController,
    private router:Router
  ) { }

  ngOnInit() {}

  async closeMenu(){
    await this.modalController.dismiss();
  }

  getUserRole() {
    this.role = localStorage.getItem('userRole') || 'Family-Member';
  }
  
  async logout() {
    await this.closeMenu();
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

  async navigate(link:string){
    await this.closeMenu();
    this.router.navigateByUrl(link);
  } 

}
