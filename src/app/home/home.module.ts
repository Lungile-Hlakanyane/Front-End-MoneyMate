import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { Router } from '@angular/router';
import { ChartdiagramComponent } from "../re-useable-components/chart/chartdiagram/chartdiagram.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ChartdiagramComponent,
    HomePage
],
  declarations: []
})
export class HomePageModule {

  
}
