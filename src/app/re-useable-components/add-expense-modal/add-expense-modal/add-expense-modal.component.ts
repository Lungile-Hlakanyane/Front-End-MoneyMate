import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { IonHeader, IonToolbar, IonTitle } from "@ionic/angular/standalone";
import { ExpenseService } from 'src/app/services/Expense-Service/expense.service';
import { ExpenseDTO } from 'src/app/models/Expense';

@Component({
  selector: 'app-add-expense-modal',
  templateUrl: './add-expense-modal.component.html',
  styleUrls: ['./add-expense-modal.component.scss'],
  standalone: true,
  imports:[IonicModule, FormsModule, CommonModule, ReactiveFormsModule]
})
export class AddExpenseModalComponent  implements OnInit {
  expenseForm: FormGroup;
  userId!: number;

  expense: ExpenseDTO = {
    description: '',
    amount: 0,
    category: '',
    dateTime: '',
    userId: this.userId
  };

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private toastController:ToastController,
    private loadingController: LoadingController,
    private expenseService:ExpenseService,
    private modalController:ModalController
  ) {
    this.expenseForm = this.fb.group({
      description: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      category: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  ngOnInit(){
    console.log("Received userId in the modal, ", this.userId);
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  async submitExpense() {
    if (this.expenseForm.invalid) return;

    const loading = await this.loadingController.create({
      message: 'Saving...',
      spinner: 'circular'
    });
    await loading.present();

    const expenseData = {
      ...this.expenseForm.value,
      dateTime: this.expenseForm.value.date,
      userId: this.userId //attach userId here
    };

    this.expenseService.addExpense(expenseData).subscribe({
      next: async (data) => {
        await loading.dismiss();
        await this.modalController.dismiss(data);

        const toast = await this.toastController.create({
          message: 'Expense Successfully Added...',
          duration: 2000,
          position: 'top',
          color: 'success'
        });
        toast.present();
      },
      error: async (err) => {
        await loading.dismiss();
        console.error('Error saving expense', err);

        const toast = await this.toastController.create({
          message: 'Failed to save expense. Please try again.',
          duration: 2000,
          position: 'top',
          color: 'danger'
        });
        toast.present();
      }
    });
  }
  

}
