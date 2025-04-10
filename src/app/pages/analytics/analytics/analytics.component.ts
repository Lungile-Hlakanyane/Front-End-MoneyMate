import { Component, OnInit } from '@angular/core';
import { IonicModule} from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';


@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
  standalone: true,
  imports:[IonicModule, FormsModule, CommonModule, ReactiveFormsModule],
  providers:[SocialSharing]
})
export class AnalyticsComponent  implements OnInit {

  constructor(
    private router:Router,
    private actionSheetCtrl:ActionSheetController,
    private socialSharing:SocialSharing
  ) { }

  ngOnInit() {}

  navigate(link: string){
    this.router.navigateByUrl(link);
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
