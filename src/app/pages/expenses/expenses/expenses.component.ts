import { Component, OnInit } from '@angular/core';
import { AlertController, IonicModule, LoadingController, ModalController, } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { AddExpenseModalComponent } from 'src/app/re-useable-components/add-expense-modal/add-expense-modal/add-expense-modal.component';
import { UserService } from 'src/app/services/User-Service/user.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
  standalone: true,
  imports:[IonicModule, FormsModule, CommonModule, ReactiveFormsModule]
})
export class ExpensesComponent  implements OnInit {
  user:User | null = null;

  constructor(
    private router:Router,
    private alertController:AlertController,
    private loadingController:LoadingController,
    private modal:ModalController,
    private userService:UserService,
  ) { }

  ngOnInit() {
    const loggedInUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (loggedInUser?.email) {
      this.userService.getUserByEmail(loggedInUser.email).subscribe({
        next: (res) => {
          this.user = res;
          console.log(res);
        },
        error: (err) => {
          console.error('Failed to load user data:', err);
        }
      });
    }
  }

  navigate(link:string){
    this.router.navigateByUrl(link)
  }

  async addExpanse() {
    const modal = await this.modal.create({
      component: AddExpenseModalComponent,
      cssClass: 'bottom-modal',
      backdropDismiss: true,
      componentProps: {
        userId: this.user?.id // passing this id to the add expense component
      }
    });
  
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data) {
      console.log('Modal returned data:', data);
    }
  }
  

}
