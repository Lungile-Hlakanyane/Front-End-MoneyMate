import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { IonicModule} from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-chartdiagram',
  templateUrl: './chartdiagram.component.html',
  styleUrls: ['./chartdiagram.component.scss'],
  standalone: true,
  imports:[IonicModule, FormsModule, CommonModule],
})
export class ChartdiagramComponent  implements AfterViewInit {
  @ViewChild('barChart') barChart: any;
  chart: any;

  constructor() {}

  ngAfterViewInit() {
    this.createLineChart();
  }

  createLineChart() {
    this.chart = new Chart(this.barChart.nativeElement, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [{
          label: 'My Expenses',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: 'rgba(75, 192, 192, 1)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: false
          }
        }
      }
    });
  }
  

}
