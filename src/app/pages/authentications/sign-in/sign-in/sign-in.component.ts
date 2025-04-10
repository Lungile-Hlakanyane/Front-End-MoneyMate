import { Component, OnInit } from '@angular/core';
import { IonicModule, } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  standalone: true,
  imports:[IonicModule, FormsModule, CommonModule, ReactiveFormsModule]
})
export class SignInComponent  implements OnInit {

  showPassword: boolean = false;

  constructor(
    private router:Router,
    private loadingController:LoadingController,
    private toastController:ToastController
  ) { }

  ngOnInit() {}

  togglePassword(){
    this.showPassword = !this.showPassword;
  }

  async login(){
    const loading = await this.loadingController.create({
      message: 'Signing in..',
      spinner: 'circular',
      duration: 3000
    });
    await loading.present();
    setTimeout(async () => {
      await loading.dismiss();
      const toast = await this.toastController.create({
        message: 'Successfully logged in...',
        duration: 2000,
        position: 'top',
        color: 'success'
      });
      await toast.present();
      setTimeout(() => {
        this.router.navigateByUrl('/home');
      }, 2000);
    }, 3000);
  }

  navigate(link:string){
    this.router.navigateByUrl(link);
  }

}
