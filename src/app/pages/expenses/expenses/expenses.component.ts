import { Component, OnInit } from '@angular/core';
import { AlertController, IonicModule, LoadingController, ModalController, } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { AddExpenseModalComponent } from 'src/app/re-useable-components/add-expense-modal/add-expense-modal/add-expense-modal.component';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
  standalone: true,
  imports:[IonicModule, FormsModule, CommonModule, ReactiveFormsModule]
})
export class ExpensesComponent  implements OnInit {

  constructor(
    private router:Router,
    private alertController:AlertController,
    private loadingController:LoadingController,
    private modal:ModalController,
  ) { }

  ngOnInit() {}

  navigate(link:string){
    this.router.navigateByUrl(link)
  }

  async addExpanse() {
    const modal = await this.modal.create({
      component: AddExpenseModalComponent,
      cssClass: 'bottom-modal',
      backdropDismiss: true,
      componentProps: {}
    });
  
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data) {
      console.log('Modal returned data:', data);
    }
  }
  

}
