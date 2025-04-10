import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular'; 
import { NavigationEnd, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SideMenuComponent } from '../../side-menu/side-menu/side-menu.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class TabsComponent  implements OnInit {

  selectedTab: string = 'home'; 
  role: string = '';

  constructor(
    private router:Router,
    private modalController:ModalController,
    private cdr:ChangeDetectorRef
  ) { 
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.selectedTab = this.getActiveTab(event.urlAfterRedirects);
      }
    });
  }

  ngOnInit() {
    this.getUserRole();
    this.cdr.detectChanges();
  }

  onTabChange(tab: string) {
    this.selectedTab = tab;
    if (tab === 'menu') {
      this.openMenuModal();
    }
  }
  
  async openMenuModal() {
    const modal = await this.modalController.create({
      component: SideMenuComponent,
      cssClass: 'custom-modal', 
    });
    await modal.present();
  }

  getUserRole() {
    this.role = localStorage.getItem('userRole') || 'Admin';
  }
  
  getActiveTab(url: string): string {
    const segments = url.split('/');
    return segments[segments.length - 1] || 'home';
  }

}
