import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SignUpComponent } from './pages/authentications/sign-up/sign-up/sign-up.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SignInComponent } from './pages/authentications/sign-in/sign-in/sign-in.component';
import { SideMenuComponent } from './re-useable-components/side-menu/side-menu/side-menu.component';
import { ProfileComponent } from './pages/profile/profile/profile.component';
import { ViewImageModalComponent } from './re-useable-components/view-image-modal/view-image-modal/view-image-modal.component';
import { SettingsComponent } from './pages/settings/settings/settings.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile/edit-profile.component';
import { ExpensesComponent } from './pages/expenses/expenses/expenses.component';
import { AddExpenseModalComponent } from './re-useable-components/add-expense-modal/add-expense-modal/add-expense-modal.component';
import { ExpenseDetailsComponent } from './pages/expense-details/expense-details/expense-details.component';
import { AnalyticsComponent } from './pages/analytics/analytics/analytics.component';
import { ChartdiagramComponent } from './re-useable-components/chart/chartdiagram/chartdiagram.component';
import { NotificationsComponent } from './pages/notifications/notifications/notifications.component';
import { ViewNotificationComponent } from './pages/view-notification/view-notification/view-notification.component';
import { HttpClientModule } from '@angular/common/http';
import { AboutComponent } from './pages/about/about/about.component';
import { TermsAndConditionsComponent } from './pages/terms-and-conditions/terms-and-conditions/terms-and-conditions.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, SignUpComponent, 
    NgxSpinnerModule, SignInComponent, SideMenuComponent, ProfileComponent, ViewImageModalComponent, 
    SettingsComponent, EditProfileComponent, ExpensesComponent,  AddExpenseModalComponent, ExpenseDetailsComponent, 
    AnalyticsComponent, ChartdiagramComponent, NotificationsComponent, ViewNotificationComponent,HttpClientModule,
    AboutComponent,TermsAndConditionsComponent],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
