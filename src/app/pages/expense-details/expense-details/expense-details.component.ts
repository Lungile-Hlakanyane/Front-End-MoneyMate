import { Component, OnInit } from '@angular/core';
import { IonicModule, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { AddExpenseModalComponent } from 'src/app/re-useable-components/add-expense-modal/add-expense-modal/add-expense-modal.component';

@Component({
  selector: 'app-expense-details',
  templateUrl: './expense-details.component.html',
  styleUrls: ['./expense-details.component.scss'],
  standalone: true,
  imports:[IonicModule, FormsModule, CommonModule, ReactiveFormsModule]
})
export class ExpenseDetailsComponent  implements OnInit {

  constructor(
    private router:Router,
    private actionSheetController:ActionSheetController,
    private modalController:ModalController,
    private alertController:AlertController,
    private toastController:ToastController,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {}

  navigate(link:string){
    this.router.navigateByUrl(link)
  }

  async openEditSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Options',
      buttons: [
        {
          text: 'Edit',
          icon: 'create-outline',
          handler: () => {
            this.editExpenseModal(); 
          }
        },
        {
          text: 'Delete',
          icon: 'trash-outline',
          handler: () => {
            this.deleteExpense(); 
          }
        },
        {
          text: 'Cancel',
          icon: 'close-outline',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  async editExpenseModal() {
    const modal = await this.modalController.create({
      component: AddExpenseModalComponent,
      componentProps: {
        mode: 'edit', 
        expenseData: {
        }
      },
      breakpoints: [0, 0.5, 0.9],
      initialBreakpoint: 0.9, 
      showBackdrop: true
    });
    await modal.present();
    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      console.log('Updated Expense:', data);
    }
  }

 async deleteExpense() {
  const alert = await this.alertController.create({
    header: 'Confirm Delete',
    message: 'Are you sure you want to delete this expense?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Yes',
        handler: async () => {
          const loading = await this.loadingController.create({
            message: 'Deleting...',
            duration: 2000
          });
          await loading.present();
          setTimeout(async () => {
            await loading.dismiss();
            const toast = await this.toastController.create({
              message: 'You have successfully deleted this expense.',
              duration: 2000,
              color: 'success',
              position: 'top'
            });
            await toast.present().then(()=>{
              this.router.navigateByUrl('/expenses');
            });
          }, 2000);
        }
      }
    ]
  });

  await alert.present();
}
  
}
