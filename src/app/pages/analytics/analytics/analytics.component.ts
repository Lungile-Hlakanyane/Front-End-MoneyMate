import { AfterViewInit, Component, OnInit } from '@angular/core';
import { IonicModule} from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { ExpenseDTO } from 'src/app/models/Expense';
import { IncomeService } from 'src/app/services/Income-service/income.service';
import { ExpenseService } from 'src/app/services/Expense-Service/expense.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
  standalone: true,
  imports:[IonicModule, FormsModule, CommonModule, ReactiveFormsModule],
  providers:[SocialSharing]
})
export class AnalyticsComponent  implements OnInit, AfterViewInit {

  userId = 14;
  expenses: ExpenseDTO[] = [];
  income: number = 0;
  categoryTotals: { [key: string]: number } = {};
  chart: any;
  legendItems: { category: string; percentage: string; color: string }[] = [];

  constructor(
    private incomeService: IncomeService,
    private expenseService: ExpenseService,
    private router:Router,
    private actionSheetCtrl:ActionSheetController,
    private socialSharing:SocialSharing
  ) { }

  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  updateLegend(categories: string[], amounts: number[], percentages: number[], colors: string[]) {
    this.legendItems = categories.map((cat, index) => ({
      category: cat,
      percentage: percentages[index].toFixed(1),
      color: colors[index]
    }));
  }

  ngOnInit() {
    this.loadAnalyticsData();
  }

  navigate(link: string){
    this.router.navigateByUrl(link);
  }

  loadAnalyticsData() {
    this.expenseService.getExpensesByUserId(this.userId).subscribe(expenses => {
      this.expenses = expenses;
      this.groupByCategory();

      this.incomeService.getIncomeByUserId(this.userId).subscribe(data => {
        this.income = data.amount;
        this.drawPieChart();
      });
    });
  }
  
  drawPieChart() {
    const categories = Object.keys(this.categoryTotals);
    const amounts = Object.values(this.categoryTotals);
    const percentages = amounts.map(val => (val / this.income) * 100);
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#8E44AD', '#2ECC71'];

    if (this.chart) this.chart.destroy();

    this.chart = new Chart('categoryPieChart', {
      type: 'pie',
      data: {
        labels: categories,
        datasets: [{
          data: amounts,
          backgroundColor: colors,
        }]
      },
      options: {
        plugins: {
          tooltip: {
            callbacks: {
              label: (context: any) => {
                const index = context.dataIndex;
                const value = amounts[index];
                const pct = percentages[index].toFixed(1);
                return `${categories[index]}: ${value} (${pct}%)`;
              }
            }
          }
        }
      }
    });
  }

  groupByCategory() {
    this.categoryTotals = {};
    this.expenses.forEach(exp => {
      if (exp.category) {
        this.categoryTotals[exp.category] = (this.categoryTotals[exp.category] || 0) + exp.amount;
      }
    });
  }


  async openShareSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Actions',
      buttons: [
        {
          text: 'Share',
          icon: 'share-social-outline',
          handler: () => {
            console.log('Share clicked');
            this.shareContent();
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

  shareContent() {
    const message = 'Check out this awesome app!';
    const subject = 'MoneyMate';
    const url = 'https://yourapp.com'; // Optional URL
    this.socialSharing.share(message, subject, url).then(() => {
      console.log('Successful share');
    }).catch((error) => {
      console.error('Error sharing:', error);
    });
  }

}
