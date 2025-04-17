import { Component, OnInit } from '@angular/core';
import { IonicModule, LoadingController, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-notification',
  templateUrl: './view-notification.component.html',
  styleUrls: ['./view-notification.component.scss'],
  standalone: true,
  imports:[IonicModule, FormsModule, CommonModule, ReactiveFormsModule]
})
export class ViewNotificationComponent  implements OnInit {
  isArchived: boolean = false; 

  constructor(
    private router:Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {}

  navigate(link:string){
    this.router.navigateByUrl(link);
  }

  async handleArchiveAction() {
    const loading = await this.loadingCtrl.create({
      message: 'Archiving message....',
      spinner: 'crescent',
      duration: 2000
    });

    await loading.present();

    await loading.onDidDismiss();

    const toast = await this.toastCtrl.create({
      message: 'Message archived successfully..',
      duration: 2000,
      color: 'success',
      position: 'top'
    });

    await toast.present();

    this.isArchived = true;
  }

}
