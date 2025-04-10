import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { IonHeader, IonToolbar, IonTitle } from "@ionic/angular/standalone";

@Component({
  selector: 'app-add-expense-modal',
  templateUrl: './add-expense-modal.component.html',
  styleUrls: ['./add-expense-modal.component.scss'],
  standalone: true,
  imports:[IonicModule, FormsModule, CommonModule, ReactiveFormsModule]
})
export class AddExpenseModalComponent  implements OnInit {

  expenseForm: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private toastController:ToastController,
    private loadingController: LoadingController
  ) {
    this.expenseForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(0.01)]],
      category: ['', Validators.required],
      date: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  async submitExpense() {
    const loading = await this.loadingController.create({
      message: 'Saving...',
      duration: 2000, 
      spinner: 'circular'  
    });
    await loading.present();
    setTimeout(async () => {
      await loading.dismiss();
      this.dismissModal();
      const toast = await this.toastController.create({
        message: 'Expense Successfully Added...',
        duration: 2000,  
        position: 'top',
        color: 'success'
      });
      toast.present();
    }, 2000);
  }

}
