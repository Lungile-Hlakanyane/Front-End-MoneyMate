import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChartdiagramComponent } from '../re-useable-components/chart/chartdiagram/chartdiagram.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, ChartdiagramComponent, CommonModule, FormsModule]
})
export class HomePage {

  constructor(private router: Router){}

  navigate(link:string){
    this.router.navigateByUrl(link);
  }

}
