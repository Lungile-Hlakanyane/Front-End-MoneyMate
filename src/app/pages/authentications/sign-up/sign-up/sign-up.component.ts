import { Component, OnInit } from '@angular/core';
import { IonicModule, LoadingController, ModalController, ToastController, } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NextStepComponent } from 'src/app/re-useable-components/success-created-account/next-step/next-step.component';
import { UserService } from 'src/app/services/User-Service/user.service';
import { User } from 'src/app/models/User';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  standalone: true,
  imports:[IonicModule, FormsModule, CommonModule, ReactiveFormsModule,HttpClientModule]
})
export class SignUpComponent  implements OnInit {
  signUpForm!: FormGroup;
  showPassword: boolean = false;

  constructor(
    private router:Router,
    private loadingController:LoadingController,
    private toastController:ToastController,
    private fb: FormBuilder,
    private modal:ModalController,
    private userService:UserService
  ) { }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  async signUp() {
    if (this.signUpForm.valid) {
      const loading = await this.loadingController.create({
        message: 'Creating Profile...',
        spinner: 'circular',
      });
      await loading.present();
  
      const formData: User = {
        username: this.signUpForm.value.username,
        email: this.signUpForm.value.email,
        password: this.signUpForm.value.password
      };
  
      this.userService.registerUser(formData).subscribe({
        next: async (res) => {
          console.log('Registration successfull', res);
          await loading.dismiss();
          const toast = await this.toastController.create({
            message: 'Successfully created profile.',
            duration: 2000,
            position: 'top',
            color: 'success'
          });
          await toast.present();
  
          const modal = await this.modal.create({
            component: NextStepComponent,
            backdropDismiss: false,
            cssClass: 'bottom-modal'
          });
          await modal.present();
        },
        error: async (err) => {
          await loading.dismiss();
          console.log('Registration error ', err);
          const toast = await this.toastController.create({
            message: 'Something went wrong. Try again!',
            duration: 2000,
            position: 'top',
            color: 'danger'
          });
          await toast.present();
        }
      });
    }
  }
  
  
  get f(){
    return this.signUpForm.controls;
  }

  navigate(link:string){
    this.router.navigateByUrl(link);
  }

}
