import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-next-step',
  templateUrl: './next-step.component.html',
  styleUrls: ['./next-step.component.scss'],
  standalone: true,
  imports:[IonicModule, FormsModule, CommonModule,]
})
export class NextStepComponent  implements OnInit {

  constructor(
    private router:Router,
    private modalController:ModalController
  ) { }

  ngOnInit() {}

  async dismiss(){
    this.modalController.dismiss().then(()=>{
      this.router.navigateByUrl('/login');
    })
  }

}
