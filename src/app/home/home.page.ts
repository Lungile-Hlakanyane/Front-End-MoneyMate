import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ExpenseDTO } from '../models/Expense';
import { ChartdiagramComponent } from '../re-useable-components/chart/chartdiagram/chartdiagram.component';
import { ExpenseService } from '../services/Expense-Service/expense.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/User-Service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, ChartdiagramComponent, CommonModule, FormsModule]
})
export class HomePage implements OnInit {

  expenses: ExpenseDTO[] = [];
  userId!: number;

  constructor(
    private router: Router,
    private expenseService:ExpenseService,
    private http:HttpClient,
    private userService:UserService
  ){}


  ngOnInit() {
    const storedUser = this.userService.getLoggedInUser();
    if (storedUser && storedUser.email) {
      this.userService.getUserByEmail(storedUser.email).subscribe({
        next: (user) => {
          this.userId = user.id;
          this.loadUserExpenses(); // Now we can safely load expenses
        },
        error: (err) => {
          console.error('Failed to fetch user by email', err);
        }
      });
    } else {
      console.error('No logged in user found in local storage');
    }
  }

  navigate(link:string){
    this.router.navigateByUrl(link);
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

  getIcon(category: string): string {
    switch (category.toLowerCase()) {
      case 'groceries': return '../../assets/icons/eating-icon.svg';
      case 'bills': return '../../assets/icons/bill-invoice-icon.svg';
      case 'entertainment': return '../../assets/icons/entertainment-icon.svg';
      default: return '../../assets/icons/default-icon.svg';
    }
  }

}
