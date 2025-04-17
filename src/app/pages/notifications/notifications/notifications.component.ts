import { Component, OnInit } from '@angular/core';
import { IonicModule, LoadingController, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  standalone: true,
  imports:[IonicModule, FormsModule, CommonModule, ReactiveFormsModule]
})
export class NotificationsComponent  implements OnInit {
  notifications = [
    { name: 'Kirana Sari', time: 6, timestamp: '12:00' },
    { name: 'Kirana Sari', time: 14, timestamp: '12:00' },
    { name: 'Kirana Sari', time: 19, timestamp: '12:00' },
    { name: 'Kirana Sari', time: 21, timestamp: '12:00' },
  ];

  constructor(
    private router:Router,
    private toastController:ToastController,
    private loadingController:LoadingController 
  ) { }

  ngOnInit() {}

  async save(){

  }

  navigate(link:string){
    this.router.navigateByUrl(link);
  }

}
