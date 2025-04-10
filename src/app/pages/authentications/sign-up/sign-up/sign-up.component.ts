import { Component, OnInit } from '@angular/core';
import { IonicModule, LoadingController, ToastController, } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule, } from 'ngx-spinner';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  standalone: true,
  imports:[IonicModule, FormsModule, CommonModule, ReactiveFormsModule]
})
export class SignUpComponent  implements OnInit {

  showPassword: boolean = false;

  constructor(
    private router:Router,
    private loadingController:LoadingController,
    private toastController:ToastController
  ) { }

  ngOnInit() {
      
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  async signUp() {
    const loading = await this.loadingController.create({
      message: 'Creating Profile..',
      spinner: 'circular',
      duration: 3000
    });
    await loading.present();
    setTimeout(async () => {
      await loading.dismiss();
      const toast = await this.toastController.create({
        message: 'Successfully created profile..',
        duration: 2000,
        position: 'top',
        color: 'success'
      });
      await toast.present();
      setTimeout(() => {
        this.router.navigateByUrl('/login');
      }, 2000);
    }, 3000);
  }
  

  navigate(link:string){
    this.router.navigateByUrl(link);
  }

}
