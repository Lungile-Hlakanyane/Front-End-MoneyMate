import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, LoadingController, ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  imports: [IonicModule, FormsModule, CommonModule],
  standalone: true,
})
export class SettingsComponent  implements OnInit {
  searchActivated: boolean = false;
  searchTerm: string =''; 
  role: string = 'Admin'; 

  constructor(
    private router:Router,
    private loadingController: LoadingController,
    private modalController: ModalController,
    private alertController:AlertController
  ) { }

  ngOnInit() {}

  settingsOptions = [
    { category: 'Account', label: 'Edit Profile', link: '', icon: 'person-circle-outline' },
    { category: 'Security', label: 'Security', link: '', icon: 'lock-closed-outline' },
    { category: 'Notifications', label: 'Notifications', link: '', icon: 'mail-unread-outline' },
    { category: 'Analytics', label: 'Analytics', link: '', icon: 'pie-chart-outline' },
    { category: 'Support & About', label: 'Help & Support', link: '', icon: 'help-circle-outline' },
    { category: 'Actions', label: 'Log out', link: '', icon: 'log-out-outline' }
  ];

  filteredOptions = [...this.settingsOptions];

  async deleteAccount() {
    const alert = await this.alertController.create({
      header: 'Confirm Logout',
      message: 'Are you sure you want to delete your account?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Account deletion canceled');
          },
        },
        {
          text: 'Yes',
          handler: async () => {
            const loading = await this.loadingController.create({
              message: 'Deleting account...',
              duration: 2000,
            });
            await loading.present();
  
            setTimeout(async () => {
              await loading.dismiss();
              this.openDeleteAccountModal(); 
            }, 2000);
          },
        },
      ],
    });
    await alert.present();
  }

  async openDeleteAccountModal() {
    // const modal = await this.modalController.create({
    //   component: DeleteAccountModalComponent, 
    //   cssClass: 'bottom-modal',
    //   backdropDismiss: true, 
    // });
    // await modal.present();
  }

  navigateToHome() {
    this.router.navigate(['/home']); 
  }

  navigate(link: string, label: string) {
    if (label === 'Log out')
       {
      this.logout();
    } else if (label === 'home') 
      {
      if (this.role === 'Admin') 
        {
        this.router.navigateByUrl('/home');
      } else
       {
        this.router.navigateByUrl('/home');
      }
    } else if ( label === 'Analytics'){
      this.router.navigateByUrl('/analytics');
    }
    else if(label === 'Edit Profile'){
      if(this.role === 'Admin'){
        this.router.navigateByUrl('/edit-profile');
      }else{
        this.router.navigateByUrl('/profile');
      }
    }else if( label === 'Notifications'){
      if(this.role==='Admin'){
        this.router.navigateByUrl('/notifications');
      }else{
        this.router.navigateByUrl('/notifications');
      }
    }
    else if (link) 
      {
      this.router.navigateByUrl(link);
    }
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
              spinner: 'circular'
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

  filterSettings() {
    if (!this.searchTerm) {
      this.filteredOptions = [...this.settingsOptions];
    } else {
      this.filteredOptions = this.settingsOptions.filter(option =>
        option.label.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }


}
