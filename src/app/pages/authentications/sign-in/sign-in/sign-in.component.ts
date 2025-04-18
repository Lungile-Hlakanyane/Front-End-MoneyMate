import { Component, OnInit } from '@angular/core';
import { IonicModule, } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  standalone: true,
  imports:[IonicModule, FormsModule, CommonModule, ReactiveFormsModule]
})
export class SignInComponent  implements OnInit {
  signInForm!:FormGroup;
  showPassword: boolean = false;

  constructor(
    private router:Router,
    private loadingController:LoadingController,
    private toastController:ToastController,
    private fb:FormBuilder
  ) { }

  ngOnInit() {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  togglePassword(){
    this.showPassword = !this.showPassword;
  }

  async login() {
    if (this.signInForm.valid) {
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
    } else {
      const toast = await this.toastController.create({
        message: 'Please fill in all fields correctly!',
        duration: 2000,
        position: 'top',
        color: 'danger'
      });
      await toast.present();
    }
  }

  navigate(link:string){
    this.router.navigateByUrl(link);
  }

  get f(){
    return this.signInForm.controls;
  }

}
