import { Component, OnInit } from '@angular/core';
import { AlertController, IonicModule, LoadingController, ModalController, ToastController, } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { AddExpenseModalComponent } from 'src/app/re-useable-components/add-expense-modal/add-expense-modal/add-expense-modal.component';
import { UserService } from 'src/app/services/User-Service/user.service';
import { User } from 'src/app/models/User';
import { ExpenseService } from 'src/app/services/Expense-Service/expense.service';
import { IncomeDTO } from 'src/app/models/Income';
import { IncomeService } from 'src/app/services/Income-service/income.service';
import { ExpenseDTO } from 'src/app/models/Expense';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
  standalone: true,
  imports:[IonicModule, FormsModule, CommonModule, ReactiveFormsModule]
})
export class ExpensesComponent  implements OnInit {
  user:User | null = null;
  totalSpent: number = 0;
  incomeAmount: number = 0;
  expenses: ExpenseDTO[] = [];
  userId!: number;

  constructor(
    private router:Router,
    private alertController:AlertController,
    private loadingController:LoadingController,
    private modal:ModalController,
    private userService:UserService,
    private expenseService:ExpenseService,
    private incomeService:IncomeService,
    private toastController:ToastController,
    private actionSheetController:ActionSheetController
  ) { }

  ngOnInit() {
    const loggedInUser = JSON.parse(localStorage.getItem('user') || '{}');
  
    if (loggedInUser?.email) {
      this.userService.getUserByEmail(loggedInUser.email).subscribe({
        next: (res) => {
          this.user = res;
          this.userId = res.id;
          console.log(res);
          this.loadUserExpenses();
          if (this.user?.id) {
            // Now that we have the user ID, fetch expenses
            this.expenseService.getExpensesByUserId(this.user.id).subscribe({
              next: (expenses) => {
                this.totalSpent = expenses.reduce((acc, curr) => acc + (curr.amount || 0), 0);
                console.log('Total Spent:', this.totalSpent);
              },
              error: (err) => {
                console.error('Error loading expenses:', err);
              }
            });
  
            // And fetch income
            this.incomeService.getIncomeByUserId(this.user.id).subscribe({
              next: (income) => {
                this.incomeAmount = income.amount;
                console.log('Income:', this.incomeAmount);
              },
              error: (err) => {
                console.error('Error loading income:', err);
              }
            });
          }
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
  
  async presentSalaryPrompt() {
    const alert = await this.alertController.create({
      header: 'Enter Monthly Salary',
      inputs: [
        {
          name: 'salary',
          type: 'number',
          placeholder: 'Total monthly salary',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('User cancelled salary input');
          },
        },
        {
          text: 'Save',
          handler: async (data) => {
            const salary = parseFloat(data.salary);
            if (!isNaN(salary) && this.user?.id) {
              const incomeDTO: IncomeDTO = {
                amount: salary,
                userId: this.user.id,
              };
  
              // Show loading spinner
              const loading = await this.loadingController.create({
                message: 'Saving...',
                spinner: 'circular',
                duration: 2000, // Optional: automatically hide after 2 seconds
              });
              await loading.present();
  
              // Call the backend to save income
              this.incomeService.createIncome(incomeDTO).subscribe({
                next: async (res) => {
                  await loading.dismiss(); // Dismiss the spinner
                  console.log('Salary saved successfully:', res);
  
                  // Show toast after successful save
                  const toast = await this.toastController.create({
                    message: 'Salary saved successfully',
                    duration: 2000,
                    color: 'success',
                    position: 'top',
                  });
                  toast.present();
                },
                error: async (err) => {
                  await loading.dismiss(); // Dismiss the spinner
                  console.error('Failed to save salary:', err);
  
                  // Optional: Show error toast
                  const errorToast = await this.toastController.create({
                    message: 'Failed to save salary. Try again.',
                    duration: 2000,
                    color: 'danger',
                    position: 'top',
                  });
                  errorToast.present();
                },
              });
            } else {
              console.log('Invalid input or user not loaded.');
            }
          },
        },
      ],
    });
    await alert.present();
  }
  

 getIncomeByUserId() {
  if (this.user?.id) {
    // Fetch total expenses
    this.expenseService.getExpensesByUserId(this.user.id).subscribe({
      next: (expenses) => {
        this.totalSpent = expenses.reduce((acc, curr) => acc + (curr.amount || 0), 0);
        console.log('Total Spent:', this.totalSpent);
      },
      error: (err) => {
        console.error('Error loading expenses:', err);
      }
    });
  
    // Fetch income
    this.incomeService.getIncomeByUserId(this.user.id).subscribe({
      next: (income) => {
        this.incomeAmount = income.amount;
        console.log('Income:', this.incomeAmount);
      },
      error: (err) => {
        console.error('Error loading income:', err);
      }
    });
  }
 }

 getSpendingProgress(): number {
  if (this.incomeAmount > 0) {
    const progress = this.totalSpent / this.incomeAmount;
    return progress > 1 ? 1 : progress;
  }
  return 0;
}

getRemainingAmount(): number {
  if (this.incomeAmount > 0) {
    return this.incomeAmount - this.totalSpent;
  }
  return 0;   
}

getIcon(category: string): string {
  switch (category.toLowerCase()) {
    case 'groceries': return '../../assets/icons/eating-icon.svg';
    case 'bills': return '../../assets/icons/bill-invoice-icon.svg';
    case 'entertainment': return '../../assets/icons/entertainment-icon.svg';
    default: return '../../assets/icons/default-icon.svg';
  }
}

loadUserExpenses() {
  if (!this.userId) return;
  this.expenseService.getExpensesByUserId(this.userId).subscribe({
    next: (data) => {
      this.expenses = data;
    },
    error: (err) => {
      console.error('Failed to fetch expenses', err);
    }
  });
}

async presentActionSheet(expense: ExpenseDTO) {
  const actionSheet = await this.actionSheetController.create({
    header: 'Manage Expense',
    buttons: [
      {
        text: 'Edit',
        icon: 'create-outline',
        handler: () => {
          this.editExpense(expense);
        }
      },
      {
        text: 'Delete',
        icon: 'trash-outline',
        role: 'destructive',
        handler: () => {
          this.deleteExpense(expense.id!);
        }
      },
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel'
      }
    ]
  });
  await actionSheet.present();
}


async editExpense(expense: ExpenseDTO) {
  const modal = await this.modal.create({
    component: AddExpenseModalComponent,
    cssClass: 'bottom-modal',
    backdropDismiss: true,
    componentProps: {
      userId: this.user?.id,
      existingExpense: expense // Pass the expense to pre-fill modal
    }
  });

  await modal.present();
  const { data } = await modal.onDidDismiss();
  if (data) {
    this.loadUserExpenses(); // Reload list after editing
  }
}

deleteExpense(expenseId: number) {
  this.expenseService.deleteExpense(expenseId).subscribe({
    next: async () => {
      this.loadUserExpenses();
      const toast = await this.toastController.create({
        message: 'Expense deleted successfully',
        duration: 2000,
        color: 'success',
        position: 'top'
      });
      toast.present();
    },
    error: async (err) => {
      console.error('Delete failed', err);
      const toast = await this.toastController.create({
        message: 'Failed to delete expense',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
    }
  });
}



}
