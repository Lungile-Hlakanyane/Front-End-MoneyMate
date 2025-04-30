import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './pages/authentications/sign-up/sign-up/sign-up.component';
import { SignInComponent } from './pages/authentications/sign-in/sign-in/sign-in.component';
import { TabsComponent } from './re-useable-components/tabs/tabs/tabs.component';
import { ProfileComponent } from './pages/profile/profile/profile.component';
import { SettingsComponent } from './pages/settings/settings/settings.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile/edit-profile.component';
import { ExpensesComponent } from './pages/expenses/expenses/expenses.component';
import { ExpenseDetailsComponent } from './pages/expense-details/expense-details/expense-details.component';
import { AnalyticsComponent } from './pages/analytics/analytics/analytics.component';
import { NotificationsComponent } from './pages/notifications/notifications/notifications.component';
import { ViewNotificationComponent } from './pages/view-notification/view-notification/view-notification.component';
import { AboutComponent } from './pages/about/about/about.component';
import { TermsAndConditionsComponent } from './pages/terms-and-conditions/terms-and-conditions/terms-and-conditions.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'sign-up', component:SignUpComponent},
  { path: 'login', component:SignInComponent},
  { path: 'profile', component:ProfileComponent},
  { path: 'edit-profile', component:EditProfileComponent},
  { path: 'expense-details', component:ExpenseDetailsComponent},
  { path: 'analytics', component:AnalyticsComponent},
  { path: 'view-notification', component:ViewNotificationComponent},
  { path: 'about', component: AboutComponent},
  { path: 'terms-and-conditions', component:TermsAndConditionsComponent},
  {
    path:'',
    component: TabsComponent,
    children:[
      { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
      { path: 'expenses', component: ExpensesComponent},
      { path: 'settings', component:SettingsComponent},
      { path: 'notifications', component: NotificationsComponent},
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
